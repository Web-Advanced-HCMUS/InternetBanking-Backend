import { Router } from 'express';

import * as UserInfoController from './User.controller.js';
import * as UserInfoValidator from './User.validator.js';

import { isAdmin, authorized } from '../../helper/authorize.mdw.js';

const router = new Router();

router.route('/create')
  .post(
    UserInfoValidator.getUserPassValidator,
    UserInfoValidator.getUserInfoValidator,
    UserInfoController.createUserController
  );

router.route('/login')
  .post(
    UserInfoValidator.getUserPassValidator,
    UserInfoController.userLoginController
  );

router.route('/get-user-info-by-token')
  .get(
    authorized(),
    UserInfoController.getUserInfoController
  );

router.route('/get-list-user')
  .get(
    isAdmin(),
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

export default router;
