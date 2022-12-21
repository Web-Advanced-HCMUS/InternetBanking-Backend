import moment from 'moment';
import jwt from 'jsonwebtoken';

import { errorMessage } from '../../utils/error.js';

import UserInfoModel from '../model/UserInfo.model.js';
import UserOTPModel from '../model/UserOTP.model.js';
import AccountModel from '../model/Account.model.js';
import UserLoginModel from '../model/UserLogin.model.js';
import EmployeeModel from '../model/Employee.model.js';

import { nodeMailerSendEmail } from '../../helper/mailer.js';

import { USER_ROLE, USER_GENDER, USER_MODEL_TYPE } from '../../utils/constant.js';

import { recoverPasswordMail } from '../../utils/mailTemplate/recoveryPassword.mailTemplate.js';
import { createAccountOTPMail } from '../../utils/mailTemplate/createAccount.mailTemplate.js';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

const autoGenAccountNumber = () => `087${Math.floor(100000 + Math.random() * 900000)}`;

const generateAccessToken = (userData) => jwt.sign(userData, ACCESS_KEY, { expiresIn: '7d' });

export const refreshTokenService = async (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, REFRESH_KEY);
    const accessToken = generateAccessToken(user);

    return accessToken;
  } catch (error) {
    return error;
  }
};

export async function generateOTPService(userId, feature) {
  try {
    let otp = Math.floor(100000 + Math.random() * 900000);
    const hasOTP = await UserOTPModel.findOne({ otp });
    if (hasOTP) otp = Math.floor(100000 + Math.random() * 900000);

    const expiredTime = moment().add(10, 'minutes');

    const useOtpSchema = {
      otp,
      userId,
      feature,
      expiredTime,
    };

    await UserOTPModel.create(useOtpSchema);

    return otp;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function createUserService(body) {
  try {
    const {
      username, password, phone, identityCard, email, role, gender, accountType
    } = body;

    const isUsername = await UserInfoModel.findOne({ username }).lean();
    if (isUsername) return errorMessage('Username existed!');

    const isEmail = await UserInfoModel.findOne({ email }).lean();
    if (isEmail) return errorMessage('Email existed!');

    const isPhone = await UserInfoModel.findOne({ phone }).lean();
    if (isPhone) return errorMessage('Phone Number existed!');

    const isId = await UserInfoModel.findOne({ identityCard }).lean();
    if (isId) return errorMessage('Identity Card ID Number existed!');

    let accountNumber = autoGenAccountNumber();
    const isAccNumber = await UserInfoModel.findOne({ accountNumber }).lean();
    if (isAccNumber) accountNumber = autoGenAccountNumber();

    const newUserInfo = {
      fullName: body?.fullName,
      phone,
      dateOfBirth: body?.dateOfBirth,
      email,
      identityCard,
      address: body?.address,
      gender: USER_GENDER[gender]
    };

    let userId = null;
    let refreshToken = null;
    if (role === USER_ROLE.CLIENT) {
      const createdUser = await UserInfoModel.create(newUserInfo);
      userId = createdUser?._id;

      const userData = { userId, username };
      refreshToken = jwt.sign(userData, REFRESH_KEY);

      const clientLoginSchema = {
        username,
        password,
        refreshToken,
        userId,
        userInfoModel: USER_MODEL_TYPE.USER
      };

      const accountSchema = {
        userId,
        accountOwnerName: body?.fullName,
        accountNumber,
        accountType
      };

      await Promise.all([
        UserLoginModel.create(clientLoginSchema),
        AccountModel.create(accountSchema)
      ]);
    } else {
      newUserInfo.role = USER_ROLE[role];

      const createdUser = await EmployeeModel.create(newUserInfo);

      const userData = { userId, username };
      refreshToken = jwt.sign(userData, REFRESH_KEY);

      const clientLoginSchema = {
        username,
        password,
        refreshToken,
        userId,
        userInfoModel: USER_MODEL_TYPE.EMPLOYEE
      };
      await UserLoginModel.create(clientLoginSchema);

      userId = createdUser?._id;
    }

    // Generate OTP
    const otp = await generateOTPService(userId, 'Verify Account');

    await nodeMailerSendEmail(
      'Banking Recovery Auto Mail',
      email,
      null,
      'Create Account Confirmation OTP',
      createAccountOTPMail(body?.fullName, otp)
    );

    return { userId, accountNumber };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function createAccountOTPVerifyService(userId, otp) {
  try {
    const findOTP = await UserOTPModel.findOne({ userId, otp }).populate('userId');
    if (!findOTP) return errorMessage(405, 'WRONG OTP!');

    if (findOTP?.userId?.isActivated) return errorMessage(405, 'ACCOUNT ACTIVATED!');

    const currentTime = moment();
    if (currentTime > findOTP?.expiredTime) return errorMessage(405, 'OTP EXPIRED!');

    await Promise.all([
      UserInfoModel.findByIdAndUpdate(userId, { isActivated: true }),
      UserOTPModel.findByIdAndDelete(findOTP?._id),
    ]);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function userLoginService(body) {
  try {
    const { username, password } = body;

    const user = await UserInfoModel.findOne({ username });

    if (!user) return errorMessage(404, 'USER NOT FOUND!');

    if (!(user?.password === password)) return errorMessage(405, 'WRONG PASSWORD!');

    if (!user?.isActivated) return errorMessage(405, 'UNACTIVED!');

    const userData = {
      userId: user?._id,
      username: user?.username,
    };
    const token = generateAccessToken(userData);

    return { token, userData };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getUserInfoService(auth) {
  try {
    const { _id } = auth;

    const userData = await UserInfoModel.findById(_id);

    return userData;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getListUserService(skip, limit) {
  try {
    const [payload, count] = await Promise.all([
      UserInfoModel.find(
        { isActivated: true },
        {
          accountNumber: 1,
          currentBalance: 1,
        }
      )
      .skip(skip)
      .limit(limit)
      .lean(),
      UserInfoModel.countDocuments({}),
    ]);

    return [count, payload];
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function sendMailForgotPasswordService(username) {
  try {
    const hasUser = await UserInfoModel.findOne({ username }).lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    const { fullName, email, _id } = hasUser;

    // Generate OTP
    const otp = await generateOTPService(_id, 'Forgot Password');

    await nodeMailerSendEmail(
      email,
      'Banking Recovery Auto Mail',
      'Password Recovery',
      recoverPasswordMail(fullName, otp),
      null
    );

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function forgotPasswordService(username, otp, newPass) {
  try {
    const hasOTP = await UserOTPModel.findOne({ otp })
      .populate('userId')
      .lean();
    if (!hasOTP) return errorMessage(405, 'Wrong OTP');

    if (hasOTP?.userId?.username !== username) { return errorMessage(405, 'Wrong OTP'); }

    const currentTime = moment();
    if (hasOTP?.expiredTime < currentTime) { return errorMessage(405, 'OTP Expired!'); }

    const { _id } = hasOTP.userId;
    await UserInfoModel.findByIdAndUpdate(_id, { password: newPass });

    await UserOTPModel.findByIdAndDelete(hasOTP._id);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function changePasswordService(auth, oldPass, newPass) {
  try {
    const { _id } = auth;
    const hasUser = await UserInfoModel.findById(_id).lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    if (hasUser?.password !== oldPass) { return errorMessage(405, 'WRONG OLD PASSWORD!'); }

    await UserInfoModel.findByIdAndUpdate(_id, { password: newPass });

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getUserByAccountNumberService(accountNumber) {
  try {
    const hasUser = await UserInfoModel.findOne(
      { accountNumber },
      { fullName: 1, accountNumber: 1 }
    ).lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    return hasUser;
  } catch (error) {
    return errorMessage(500, error);
  }
}
