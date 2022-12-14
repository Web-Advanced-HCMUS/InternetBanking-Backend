import { Router } from 'express';

import * as UserInfoController from './User.controller.js';
import * as UserInfoValidator from './User.validator.js';

import { isEmployee, authorized } from '../../helper/authorize.mdw.js';

const router = new Router();

router.route('/refresh-token')
  .post(
    UserInfoValidator.getUserIdValidator,
    UserInfoController.refreshTokenController
  );

// router.route('/verify-account')
//   .get(
//     UserInfoValidator.getUserIdValidator,
//     UserInfoController.createAccountOTPVerifyController
//   );

router.route('/login')
  .post(
    UserInfoValidator.getUserPassValidator,
    UserInfoController.userLoginController
  );

router.route('/logout')
  .post(
    authorized(),
    UserInfoController.userLogoutController
  );

router.route('/get-user-info-by-token')
  .get(
    authorized(),
    UserInfoController.getUserInfoController
  );

router.route('/get-list-user')
  .get(
    isEmployee(),
    UserInfoController.getListUserController
  );

router.route('/send-mail-forgot-pass/:username')
  .post(
    UserInfoController.sendMailForgotPasswordController
  );

router.route('/forgot-pass')
  .post(
    UserInfoController.forgotPasswordController
  );

router.route('/change-pass')
  .put(
    authorized(),
    UserInfoController.changePasswordController
  );

router.route('/get-user-by-account-number/:accountNumber')
  .get(
    authorized(),
    UserInfoController.getUserByAccountNumberController
  );

router.route('/close-account/:accountNumber')
  .post(
    authorized(),
    UserInfoController.closeAccountByAccountNumberController
  );

export default router;
