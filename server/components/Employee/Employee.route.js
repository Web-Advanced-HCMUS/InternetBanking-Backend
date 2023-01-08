import { Router } from "express";

import * as EmployeeController from "./Employee.controller.js";
import * as EmployeeValidator from "./Employee.validator.js";

import * as UserInfoValidator from "../User/User.validator.js";
import * as UserInfoController from "../User/User.controller.js";

import { isEmployee } from "../../helper/authorize.mdw.js";

const router = new Router();

router.route("/create").post(
  // // isEmployee(),
  // // UserInfoValidator.getUserPassValidator,
  UserInfoValidator.getUserInfoValidator,
  UserInfoController.createUserController
);

router
  .route("/add-payment-account")
  .post(
    isEmployee(),
    EmployeeValidator.addAccountValidator,
    EmployeeController.addPaymentAccountController
  );

router
  .route("/customer-recharge")
  .post(
    isEmployee(),
    EmployeeValidator.getRechargeInfoValidator,
    EmployeeController.accountRechargeController
  );

router
  .route("/single-transfer-history/:type/:order")
  .post(isEmployee(), EmployeeController.transactionHistoryController);

export default router;
