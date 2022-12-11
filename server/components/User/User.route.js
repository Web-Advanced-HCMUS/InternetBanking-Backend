import { Router } from 'express';

import * as UserInfoController from './User.controller.js';
import * as UserInfoValidator from './User.validator.js';

import { isAdmin, authorized } from '../../helper/authorize.mdw.js';

const router = new Router();

router.route('/create')
  .post(
    isAdmin(),
    UserInfoValidator.getUserPassValidator,
    UserInfoValidator.getUserInfoValidator,
    UserInfoController.createUserController
  );

router.route('/login')
  .post(
    UserInfoValidator.getUserPassValidator,
    UserInfoController.userLoginController
  );

router.route('/get-user-info')
  .get(
    authorized(),
    UserInfoController.getUserInfoController
  );

router.route('/get-list-user')
  .get(
    isAdmin(),
    UserInfoController.getListUserController
  );

export default router;
