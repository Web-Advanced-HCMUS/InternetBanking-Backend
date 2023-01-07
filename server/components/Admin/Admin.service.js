import moment from 'moment';
import jwt from 'jsonwebtoken';

import { errorMessage } from '../../utils/error.js';

import EmployeeModel from '../model/Employee.model.js';
import UserLoginModel from '../model/UserLogin.model.js';

import { USER_MODEL_TYPE } from '../../utils/constant.js';

export async function updateEmployeeService(empId, body) {
  try {
    const findEmp = await EmployeeModel.findOne({ empId }).lean();
    if (!findEmp) return errorMessage(404, 'NOT FOUND');

    await EmployeeModel.findOneAndUpdate({ empId }, body);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function deleteEmployeeService(empId) {
  try {
    const findEmp = await EmployeeModel.findOne({ empId }).lean();
    if (!findEmp) return errorMessage(404, 'NOT FOUND');

    const findLogin = await UserLoginModel.findOne({ userId: findEmp?._id }).lean();
    if (!findLogin) return errorMessage(404, 'NOT FOUND');

    await Promise.all([
      EmployeeModel.findOneAndDelete({ empId }),
      UserLoginModel.findOneAndDelete({ userId: findEmp?._id })
    ]);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function getListEmployeeService(skip, limit) {
  try {
    const [payload, count] = await Promise.all([
      UserLoginModel.countDocuments({ userInfoModel: USER_MODEL_TYPE.EMPLOYEE }),
      UserLoginModel.find({ userInfoModel: USER_MODEL_TYPE.EMPLOYEE }).populate('userId')
      .skip(skip).limit(limit)
      .lean()
    ]);

    return [count, payload];
  } catch (error) {
    return errorMessage(error);
  }
}
