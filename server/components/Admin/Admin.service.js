import moment from 'moment';
import { errorMessage } from '../../utils/error.js';

import EmployeeModel from '../model/Employee.model.js';
import UserLoginModel from '../model/UserLogin.model.js';
import TransactionModel from '../model/Transaction.model.js';

import { USER_MODEL_TYPE, TRANSACTION_TYPE } from '../../utils/constant.js';

import { isValidDate } from '../../helper/date.js';

const FILTER_KEY = {
  bank: 'bank'
};

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

export async function getFilterHelperService(index, body) {
  try {
    const matchCondition = {};
    for (const [key, value] of Object.entries(body)) {
      if (Object.keys(FILTER_KEY).includes(key)
      && Array.isArray(value) && value.length) {
        if (Object.keys(body).length > 0) matchCondition.$and = [];
        matchCondition.$and.push({ [FILTER_KEY[key]]: { $in: value } });
      }
    }
    const result = await TransactionModel.aggregate([
      { $match: matchCondition },
      { $group: { _id: null, data: { $addToSet: `$${FILTER_KEY[index]}` } } }
    ]);
    const payload = result.length ? result[0]?.data.sort((a, b) => `${b}`.localeCompare(`${a}`)) : [];
    return payload;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function forControlListService(body, skip, limit) {
  try {
    const { fromDate, toDate = new Date() } = body;
    const matchCondition = {
      $and: [
        { transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER },
        { time: { $lte: toDate } }
      ]
    };
    if (isValidDate(fromDate)) matchCondition.$and.push({ time: { $gte: new Date(fromDate) } });

    for (const [key, value] of Object.entries(body)) {
      if (Object.keys(FILTER_KEY).includes(key) && Array.isArray(value) && value.length) {
        matchCondition.$and.push({ [FILTER_KEY[key]]: { $in: value } });
      }
    }

    const [count, payload] = await Promise.all([
      TransactionModel.countDocuments(matchCondition),
      TransactionModel.find(matchCondition).sort({ time: -1 })
        .skip(skip).limit(limit)
        .lean()
    ]);

    // let totalAmount = 0;
    // let totalFee = 0;
    // payload.forEach((element) => {
    //   totalAmount += element?.amount ? element.amount : 0;
    //   totalFee += element?.fee ? element.fee : 0;
    // });

    return [count, payload];
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function totalTransactionAmountService(body) {
  try {
    const { fromDate, toDate = new Date() } = body;
    const matchCondition = {
      $and: [
        { transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER },
        { time: { $lte: toDate } }
      ]
    };
    if (isValidDate(fromDate)) matchCondition.$and.push({ time: { $gte: new Date(fromDate) } });

    for (const [key, value] of Object.entries(body)) {
      if (Object.keys(FILTER_KEY).includes(key) && Array.isArray(value) && value.length) {
        matchCondition.$and.push({ [FILTER_KEY[key]]: { $in: value } });
      }
    }

    const payload = await TransactionModel.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: '$bank',
          totalAmount: { $sum: '$amount' },
          totalFee: { $sum: '$fee' }
        }
      }
    ]);

    let totalAmount = 0;
    let totalFee = 0;
    payload.forEach((element) => {
      totalAmount += element?.totalAmount ? element.totalAmount : 0;
      totalFee += element?.totalFee ? element.totalFee : 0;
    });

    return { totalAmount, totalFee, payload };
  } catch (error) {
    return errorMessage(500, error);
  }
}
