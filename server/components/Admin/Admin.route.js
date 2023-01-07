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
    isAdmin(),
    AdminController.getListEmployeeController
  );

router.route('/update-emp/:empId')
  .put(
    isAdmin(),
    AdminController.updateEmployeeController
  );

router.route('/delete-emp/:empId')
  .delete(
    isAdmin(),
    AdminController.deleteEmployeeController
  );

router.route('/for-control-filter-helper/:index')
  .post(
    isAdmin(),
    AdminController.getFilterHelperController
  );

router.route('/for-control')
  .post(
    isAdmin(),
    AdminController.forControlListController
  );

router.route('/for-control-total-amount')
  .post(
    isAdmin(),
    AdminController.totalTransactionAmountService
  );

export default router;
