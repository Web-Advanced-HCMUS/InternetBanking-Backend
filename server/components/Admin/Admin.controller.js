import * as AdminService from './Admin.service.js';
import * as UserService from '../User/User.service.js';

import { pagingQuery } from '../../utils/pagingQueryHadle.js';

export async function createEmployeeAccountController(req, res) {
  try {
    const { auth, body } = req;
    const payload = await UserService.createUserService(auth, body);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateEmployeeController(req, res) {
  try {
    const { empId } = req.params;
    const { body } = req;
    const result = await AdminService.updateEmployeeService(empId, body);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteEmployeeController(req, res) {
  try {
    const { empId } = req.params;
    const result = await AdminService.deleteEmployeeService(empId);

    return res.RH.success(result);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getListEmployeeController(req, res) {
  try {
    const { page, skip, limit } = pagingQuery(req);
    const payload = await AdminService.getListEmployeeService(skip, limit);

    return res.RH.paging(payload, page, limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getFilterHelperController(req, res) {
  try {
    const { index } = req.params;
    const { body } = req;
    const payload = await AdminService.getFilterHelperService(index, body);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function forControlListController(req, res) {
  try {
    const { page, skip, limit } = pagingQuery(req);
    const { body } = req;
    const payload = await AdminService.forControlListService(body, skip, limit);

    return res.RH.paging(payload, page, limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function totalTransactionAmountService(req, res) {
  try {
    const { body } = req;
    const payload = await AdminService.totalTransactionAmountService(body);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
