import * as UserInfoService from './User.service.js';

import { pagingQuery } from '../../utils/pagingQueryHadle.js';

export async function refreshTokenController(req, res) {
  try {
    const { refreshToken, userId } = req.query;
    const payload = await UserInfoService.refreshTokenService(userId, refreshToken);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function createUserController(req, res) {
  try {
    const { body, auth } = req;
    const payload = await UserInfoService.createUserService(auth, body);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function createAccountOTPVerifyController(req, res) {
  try {
    const { userId, otp } = req.query;
    const result = await UserInfoService.createAccountOTPVerifyService(
      userId,
      otp
    );

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function userLoginController(req, res) {
  try {
    const { body } = req;
    const result = await UserInfoService.userLoginService(body);
    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function userLogoutController(req, res) {
  try {
    const { auth } = req;
    const result = await UserInfoService.userLogoutService(auth);
    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserInfoController(req, res) {
  try {
    const { auth } = req;
    const payload = await UserInfoService.getUserInfoService(auth);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getListUserController(req, res) {
  try {
    const { page, skip, limit } = pagingQuery(req);
    const payload = await UserInfoService.getListUserService(skip, limit);

    return res.RH.paging(payload, page, limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function sendMailForgotPasswordController(req, res) {
  try {
    const { username } = req.params;
    const result = await UserInfoService.sendMailForgotPasswordService(
      username
    );

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { username, otp, newPass } = req.body;
    const result = await UserInfoService.forgotPasswordService(
      username,
      otp,
      newPass
    );

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changePasswordController(req, res) {
  try {
    const { oldPass, newPass } = req.body;
    const { auth } = req;
    const result = await UserInfoService.changePasswordService(
      auth,
      oldPass,
      newPass
    );

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserByAccountNumberController(req, res) {
  try {
    const { accountNumber } = req.params;
    const payload = await UserInfoService.getUserByAccountNumberService(
      accountNumber
    );

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function closeAccountByAccountNumberController(req, res) {
  try {
    const { auth } = req;
    const { accountNumber } = req.params;
    const result = await UserInfoService.closeAccountByAccountNumberService(auth, accountNumber);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}
