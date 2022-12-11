import moment from 'moment';
import jwt from 'jsonwebtoken';

import { errorMessage } from '../../utils/error.js';

import UserInfoModel from '../model/User.model.js';
import UserOTPModel from '../model/UserOTP.model.js';

import { nodeMailerSendEmail } from '../../helper/mailer.js';

import { USER_ROLE, USER_GENDER } from '../../utils/constant.js';

import { recoverPasswordMail } from '../../utils/mailTemplate/recoveryPassword.mailTemplate.js';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

const autoGenAccountNumber = () => `087${Math.floor(100000 + Math.random() * 900000)}`;

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
      expiredTime
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
      username,
      phone,
      identityCard,
      email,
      role,
      gender
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

    const newUser = {
      ...body,
      role: USER_ROLE[role],
      gender: USER_GENDER[gender],
      accountNumber
    };

    await UserInfoModel.create(newUser);

    return accountNumber;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function userLoginService(body) {
  try {
    const {
      username, password
    } = body;

    const user = await UserInfoModel.findOne({ username });

    if (!user) return errorMessage(404, 'USER NOT FOUND!');

    if (!(user?.password === password)) return errorMessage(405, 'WRONG PASSWORD!');

    if (!user?.isActived) return errorMessage(405, 'UNACTIVED!');

    const jwtData = {
      userId: user?._id,
      accountNumber: user?.accountNumber,
      username: user?.username
    };

    const token = jwt.sign(jwtData, ACCESS_KEY, { expiresIn: '7d' });

    return token;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getUserInfoService(auth) {
  try {
    const { _id } = auth;

    const userData = await UserInfoModel.findById(_id).populate('role').lean();

    return userData;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getListUserService(skip, limit) {
  try {
    const [payload, count] = await Promise.all([
      UserInfoModel.find({ isActived: true }, {
        accountNumber: 1,
        currentBalance: 1
      }).skip(skip).limit(limit).lean(),
      UserInfoModel.countDocuments({})
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
      'Banking Recovery Auto Mail',
      email,
      null,
      'Password Recovery',
      recoverPasswordMail(fullName, otp)
    );

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function forgotPasswordService(username, otp, newPass) {
  try {
    const hasOTP = await UserOTPModel.findOne({ otp }).populate('userId').lean();
    if (!hasOTP) return errorMessage(405, 'Wrong OTP');

    if (hasOTP?.userId?.username !== username) return errorMessage(405, 'Wrong OTP');

    const currentTime = moment();
    if (hasOTP?.expiredTime < currentTime) return errorMessage(405, 'OTP Expired!');

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

    if (hasUser?.password !== oldPass) return errorMessage(405, 'WRONG OLD PASSWORD!');

    await UserInfoModel.findByIdAndUpdate(_id, { password: newPass });

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}
