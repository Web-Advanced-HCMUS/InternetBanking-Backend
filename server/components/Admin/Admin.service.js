import moment from 'moment';
import { errorMessage } from '../../utils/error.js';

import EmployeeModel from '../model/Employee.model.js';
import UserLoginModel from '../model/UserLogin.model.js';
import TransactionModel from '../model/Transaction.model.js';

import { USER_MODEL_TYPE, TRANSACTION_TYPE } from '../../utils/constant.js';

import { isValidDate } from '../../helper/date.js';

const FILTER_KEY = {
  bank: 'bankCode'
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
    const [count, payload] = await Promise.all([
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
    const matchCondition = {
      $and: [
        { transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER },
        { bankCode: { $nin: ['TIMO', 'TIMO_CLONE'] } }
      ]
    };
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
      transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER,
      time: { $lte: new Date(toDate) },
      bankCode: { $exists: true }
    };
    if (isValidDate(fromDate)) matchCondition.time = { $gte: new Date(fromDate) };

    // for (const [key, value] of Object.entries(body)) {
    //   if (Object.keys(FILTER_KEY).includes(key) && Array.isArray(value) && value.length) {
    //     matchCondition.$and.push({ [FILTER_KEY[key]]: { $in: value } });
    //   }
    // }
    // return [matchCondition];

    const [sendPayload, receivePayload] = await Promise.all([
      TransactionModel.find({ ...matchCondition, interbankData: { $exists: true } }).sort({ time: -1 }).lean(),
      TransactionModel.find({ ...matchCondition, interbankData: { $exists: false } }).sort({ time: -1 }).lean()
    ]);

    return { sendPayload, receivePayload };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function totalTransactionAmountService(body) {
  try {
    const { fromDate, toDate } = body;
    const matchCondition = {
      transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER,
      time: { $lte: toDate || new Date() },
      haveBankCode: true
    };
    if (isValidDate(fromDate)) matchCondition.time = { $gte: new Date(fromDate) };

    for (const [key, value] of Object.entries(body)) {
      if (Object.keys(FILTER_KEY).includes(key) && Array.isArray(value) && value.length) {
        matchCondition[FILTER_KEY[key]] = { $in: value };
      }
    }

    const aggPipe = [
      {
        $addFields: {
          isSend: {
            $cond: [
              { $ifNull: ['$interbankData', false] },
              true,
              false
            ]
          },
          haveBankCode: {
            $cond: [
              { $ifNull: ['$bankCode', false] },
              true,
              false
            ]
          }
        }
      },
      { $match: matchCondition }
    ];

    const half = [
      {
        $group: {
          _id: '$bankCode',
          totalAmount: { $sum: '$amount' },
          totalFee: { $sum: '$fee' }
        }
      },
      {
        $group: {
          _id: null,
          arrayBank: {
            $addToSet: {
              bank: '$_id',
              amount: '$totalAmount',
              fee: '$totalFee'
            }
          },
          totalAmount: { $sum: '$totalAmount' },
          totalFee: { $sum: '$totalFee' }
        }
      }
    ];

    let sendAgg = aggPipe;
    let receiveAgg = aggPipe;

    sendAgg = sendAgg.concat([{ $match: { isSend: true } }, ...half]);
    receiveAgg = receiveAgg.concat([{ $match: { isSend: false } }, ...half]);

    const [sendData, receiveData] = await Promise.all([
      TransactionModel.aggregate(sendAgg),
      TransactionModel.aggregate(receiveAgg)
    ]);

    const sendPayload = {
      arrayBank: sendData[0]?.arrayBank,
      totalAmount: sendData[0]?.totalAmount,
      totalFee: sendData[0]?.totalFee
    };

    const receivePayload = {
      arrayBank: receiveData[0]?.arrayBank,
      totalAmount: receiveData[0]?.totalAmount,
      totalFee: receiveData[0]?.totalFee
    };

    return { sendPayload, receivePayload };
  } catch (error) {
    return errorMessage(500, error);
  }
}
