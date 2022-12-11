import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { errorMessage } from '../../utils/error.js';

import UserInfoModel from '../model/User.model.js';

const { ACCESS_KEY, REFRESH_KEY } = process.env;

const autoGenAccountNumber = () => `087${Math.floor(100000 + Math.random() * 900000)}`;

export async function createUserService(body) {
  try {
    const {
      username,
      phone,
      identityCard,
      email
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

    const payload = await UserInfoModel.create(body);

    return accountNumber;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function userLoginService(body) {
  try {
    const {
      username, password
    } = body;

    const user = await UserInfoModel.findOne({ username });

    if (!user) return errorMessage(404, 'USER NOT FOUND!');

    if (!bcrypt.compareSync(user?.password, password)) return errorMessage(405, 'WRONG PASSWORD!');

    if (!user?.isActived) return errorMessage(405, 'UNACTIVED!');

    const jwtData = {
      userId: user?._id,
      accountNumber: user?.accountNumber,
      username: user?.username
    };

    const token = jwt.sign(jwtData, ACCESS_KEY, { expiresIn: '7d' });

    return token;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function getUserInfoService(auth) {
  try {
    const { _id } = auth;

    const userData = await UserInfoModel.findById(_id).lean();

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
