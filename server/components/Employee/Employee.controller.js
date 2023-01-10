import * as EmployeeService from './Employee.service.js';

import { pagingQuery } from '../../utils/pagingQueryHadle.js';

export async function addPaymentAccountController(req, res) {
  try {
    const { auth, body } = req;
    const result = await EmployeeService.addPaymentAccountService(auth, body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function accountRechargeController(req, res) {
  try {
    const { body, auth } = req;
    const result = await EmployeeService.accountRechargeService(auth, body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function transactionHistoryController(req, res) {
  try {
    // const { page, skip, limit } = pagingQuery(req);
    const { body } = req;
    const { type, order } = req.params;
    const payload = await EmployeeService.transactionHistoryService(type, order, body/* , skip, limit */);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
