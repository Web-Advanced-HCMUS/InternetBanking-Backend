import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { errorMessage } from '../../utils/error.js';

import UserInfoModel from '../model/UserInfo.model.js';
import UserOTPModel from '../model/UserOTP.model.js';
import AccountModel from '../model/Account.model.js';
import UserLoginModel from '../model/UserLogin.model.js';
import EmployeeModel from '../model/Employee.model.js';

import { nodeMailerSendEmail } from '../../helper/mailer.js';

import {
  USER_ROLE, USER_GENDER, USER_MODEL_TYPE, HASH_DIGIT
} from '../../utils/constant.js';

import { recoverPasswordMail } from '../../utils/mailTemplate/recoveryPassword.mailTemplate.js';
import { createAccountOTPMail } from '../../utils/mailTemplate/createAccount.mailTemplate.js';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

export const autoGenAccountNumber = () => `087${Math.floor(100000 + Math.random() * 900000)}`;

export const generateAccessToken = (userData) => jwt.sign(userData, ACCESS_KEY, { expiresIn: '7d' });

export const autoGenEmpId = () => `${Math.floor(100000 + Math.random() * 900000)}`;

export const refreshTokenService = async (userId, refreshToken) => {
  try {
    if (!refreshToken) return errorMessage(401, 'UNAUTHORIZED!');
    const matchToken = await UserLoginModel.findOne({ userId, refreshToken }).lean();
    if (!matchToken) return errorMessage(403, 'FORBIDDEN!');

    const user = jwt.verify(refreshToken, REFRESH_KEY);
    const { _id, username } = user;

    const accessToken = generateAccessToken({ _id, username });

    return accessToken;
  } catch (error) {
    return errorMessage(500, error);
  }
};

export async function generateOTPService(userId) {
  try {
    let otp = Math.floor(100000 + Math.random() * 900000);
    const hasOTP = await UserOTPModel.findOne({ otp });
    if (hasOTP) otp = Math.floor(100000 + Math.random() * 900000);

    const expiredTime = moment().add(10, 'minutes');

    const useOtpSchema = {
      otp,
      userId,
      expiredTime,
    };

    await UserOTPModel.create(useOtpSchema);

    return otp;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function createUserService(auth, body) {
  try {
    const {
      username, phone, identityCard, email, role, gender, accountType
    } = body;

    let { password } = body;
    password = bcrypt.hashSync(password, HASH_DIGIT);

    const { _id } = auth;

    const isUsername = await UserLoginModel.findOne({ username }).lean();
    if (isUsername) return errorMessage(406, 'Username existed!');

    const isEmail = await UserInfoModel.findOne({ email }).lean();
    if (isEmail) return errorMessage(406, 'Email existed!');

    const isPhone = await UserInfoModel.findOne({ phone }).lean();
    if (isPhone) return errorMessage(406, 'Phone Number existed!');

    const isId = await UserInfoModel.findOne({ identityCard }).lean();
    if (isId) return errorMessage(406, 'Identity Card ID Number existed!');

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
    if (role === USER_ROLE.CLIENT) {
      const createdUser = await UserInfoModel.create(newUserInfo);
      userId = createdUser?._id;

      const clientLoginSchema = {
        username,
        password,
        userId,
        userInfoModel: USER_MODEL_TYPE.USER
      };

      const accountSchema = {
        userId,
        accountOwnerName: body?.fullName,
        accountNumber,
        accountType,
        createBy: _id
      };

      // Generate OTP
      const otp = await generateOTPService(userId);

      await nodeMailerSendEmail(
        'Banking Recovery Auto Mail',
        email,
        null,
        'Create Account Confirmation OTP',
        createAccountOTPMail(body?.fullName, otp)
      );

      await Promise.all([
        UserLoginModel.create(clientLoginSchema),
        AccountModel.create(accountSchema)
      ]);

    return { userId, accountNumber };
    } else {
      newUserInfo.role = USER_ROLE[role];

      let empId = autoGenEmpId();
      const isEmpId = await EmployeeModel.findOne({ empId }).lean();
      if (isEmpId) empId = autoGenEmpId();

      newUserInfo.empId = empId.trim();

      const createdUser = await EmployeeModel.create(newUserInfo);

      userId = createdUser?._id;
      const clientLoginSchema = {
        username,
        password,
        userId,
        userInfoModel: USER_MODEL_TYPE.EMPLOYEE
      };
      await UserLoginModel.create(clientLoginSchema);

    return { userId, empId };
    }
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

    const user = await UserLoginModel.findOne({ username }).populate('userId').lean();

    if (!user) return errorMessage(404, 'USER NOT FOUND!');

    if (!bcrypt.compareSync(password, user?.password)) return errorMessage(406, 'WRONG PASSWORD!');

    if (user?.userId?.role !== 'ADMIN' && user?.userId?.role !== 'EMPLOYEE'
    && !user?.userId?.isActivated) return errorMessage(405, 'UNACTIVED!');

    const { _id } = user.userId;
    const userData = { _id, username };
    const role = user?.userId?.role ? user?.userId?.role : 'CLIENT';
    const refreshToken = jwt.sign(userData, REFRESH_KEY);
    user.refreshToken = refreshToken;
    await UserLoginModel.findByIdAndUpdate(user?._id, { refreshToken });

    const accessToken = generateAccessToken(userData);

    return {
      accessToken, refreshToken, _id, username, role
    };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function userLogoutService(auth) {
  try {
    const { _id } = auth;
    const loginData = await UserLoginModel.findOne({ userId: _id });
    if (!loginData) return errorMessage(404, 'NOT FOUND!');
    loginData.refreshToken = null;
    await loginData.save();

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getUserInfoService(auth) {
  try {
    const { _id } = auth;

    let userData = null;
    if (auth?.role !== 'ADMIN' && auth?.role !== 'EMPLOYEE') {
      userData = await UserInfoModel.findById(_id).lean();
      const accounts = await AccountModel.find({ userId: _id }).lean();

      if (Array.isArray(accounts) && accounts.length) {
        userData.accounts = accounts.map((e) => ({
          accountNumber: e?.accountNumber,
          currentBalance: e?.currentBalance
        }));
      } else userData.accounts = [];
    } else userData = await EmployeeModel.findById(_id).lean();

    return userData;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getListUserService(skip, limit) {
  try {
    const [payload, count] = await Promise.all([
      AccountModel.find({ userInfoModel: USER_MODEL_TYPE.USER }).populate('userId')
      .skip(skip)
      .limit(limit)
      .lean(),
      AccountModel.countDocuments({ userInfoModel: USER_MODEL_TYPE.USER }),
    ]);

    return [count, payload];
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function sendMailForgotPasswordService(username) {
  try {
    const hasUser = await UserLoginModel.findOne({ username }).populate('userId').lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    const { fullName, email, _id } = hasUser.userId;

    // Generate OTP
    const otp = await generateOTPService(_id);

    await nodeMailerSendEmail(
      fullName,
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

    const findLogin = await UserLoginModel.findOne({ username });
    if (hasOTP?.userId?._id.toString() !== findLogin?.userId.toString()) return errorMessage(405, 'OTP not match!');

    const currentTime = moment();
    if (hasOTP?.expiredTime < currentTime) return errorMessage(405, 'OTP Expired!');

    const hashPass = bcrypt.hashSync(newPass, HASH_DIGIT);
    await UserLoginModel.findOneAndUpdate({ username }, { password: hashPass });

    await UserOTPModel.findByIdAndDelete(hasOTP._id);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function changePasswordService(auth, oldPass, newPass) {
  try {
    const { _id } = auth;
    const hasUser = await UserLoginModel.findOne({ userId: _id }).lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    if (!bcrypt.compareSync(oldPass, hasUser?.password)) return errorMessage(405, 'WRONG OLD PASSWORD!');

    const hashPass = bcrypt.hashSync(newPass);
    await UserLoginModel.findOneAndUpdate({ userId: _id }, { password: hashPass });

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getUserByAccountNumberService(accountNumber) {
  try {
    const hasUser = await AccountModel.findOne(
      { accountNumber },
      { accountOwnerName: 1, accountNumber: 1 }
    ).lean();
    if (!hasUser) return errorMessage(404, 'NOT FOUND!');

    return hasUser;
  } catch (error) {
    return errorMessage(500, error);
  }
}
