import { Router } from 'express';

import * as AdminController from './Admin.controller.js';

import { isAdmin } from '../../helper/authorize.mdw.js';

const router = new Router();

router.route('/create-emp-account')
  .post(
    isAdmin(),
    AdminController.createEmployeeAccountController
  );

router.route('/get-emp-list')
  .get(
    isAdmin()
  );

router.route('/update-emp/:empId')
  .put(
    isAdmin()
  );

router.route('/delete-emp/:empId')
  .delete(
    isAdmin()
  );

router.route('/for-control')
  .post(
    isAdmin()
  );

export default router;
