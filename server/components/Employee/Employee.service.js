import { errorMessage } from '../../utils/error';

import EmployeeModel from '../model/Employee.model';

export async function accountRechargeService(body) {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function transactionHistoryService(body, skip, limit) {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}
