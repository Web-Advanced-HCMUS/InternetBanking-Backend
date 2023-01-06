import { errorMessage } from '../../utils/error.js';

import EmployeeModel from '../model/Employee.model.js';
import TransactionModel from '../model/Transaction.model.js';
import UserLoginModel from '../model/UserLogin.model.js';
import UserInfoModel from '../model/UserInfo.model.js';
import AccountModel from '../model/Account.model.js';
import DebtModel from '../model/Debt.model.js';

import {
  TRANSACTION_TYPE, FEE_PAID_TYPE, TRANSACTION_STATUS, LIST_TRANSACTION_TYPE, ACCOUNT_TYPE
} from '../../utils/constant.js';

import { autoGenAccountNumber } from '../User/User.service.js';

const SORT_ORDER = {
  asc: 1,
  desc: -1
};

const KEY_ACCOUNT = {
  SEND: 'fromAccountNumber',
  RECEIVE: 'fromAccountNumber',
  DEBT: 'debtorAccountNumber'
};

const KEY_TIME = {
  SEND: 'time',
  RECEIVE: 'time',
  DEBT: 'startDate'
};

export async function addPaymentAccountService(auth, body) {
  try {
    const { _id } = auth;
    const { identityCard, accountType } = body;

    const findUser = await UserInfoModel.findOne({ identityCard });
    if (!findUser) return errorMessage(404, 'NOT FOUND!');

    const userId = findUser?._id;

    let accountNumber = '';
    let findAcc = '';
    do {
      accountNumber = autoGenAccountNumber();
      findAcc = await AccountModel.findOne({ accountNumber });
    } while (findAcc?.accountNumber === accountNumber);

    const accountSchema = {
      userId,
      accountOwnerName: findUser?.fullName,
      accountNumber,
      accountType: ACCOUNT_TYPE[accountType],
      createBy: _id
    };

    const createAcc = await AccountModel.create(accountSchema);

    return createAcc?.accountNumber;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function accountRechargeService(auth, body) {
  try {
    const { userInfo, amount } = body;
    const { _id } = auth;

    const emp = await EmployeeModel.findById(_id);

    const [findAccount, findUsername] = await Promise.all([
      AccountModel.findOne({ accountNumber: userInfo }),
      UserLoginModel.findOne({ username: userInfo })
    ]);

    if (!findAccount && !findUsername) return errorMessage(404, 'NOT FOUND!');

    let accountInfo = findAccount;
    if (!findAccount) {
      accountInfo = await AccountModel.find({ userId: findUsername?.userId });
      if (Array.isArray(accountInfo) && accountInfo.length > 1) {
        const accounts = accountInfo.map((e) => e?.accountNumber);
        return { message: 'Choose one Account', accounts };
      }
    }

    const accountId = accountInfo?._id;

    const rechargeSchema = {
      fromAccountNumber: null,
      fromAccountOwnerName: emp?.empId,
      toAccountOwnerName: accountInfo?.accountNumber,
      toAccountNumber: accountInfo.accountOwnerName,
      bank: 'TIMO',
      transactionType: TRANSACTION_TYPE.RECHARGE,
      feePaymentMethod: FEE_PAID_TYPE.NO,
      amount: Number(amount),
      fee: 0,
      status: TRANSACTION_STATUS.SUCCESS,
    };

    const amountUpdate = Number(accountInfo?.currentBalance) + Number(amount);

    await Promise.all([
      TransactionModel.create(rechargeSchema),
      AccountModel.findByIdAndUpdate(accountId, { currentBalance: amountUpdate })
    ]);

    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function transactionHistoryService(type, order, body, skip, limit) {
  try {
    const {
      fromDate, toDate = new Date(), accountNumber
    } = body;

    let count = 0;
    let payload = [];

    const matchCond = { $and: [{ [KEY_TIME[type]]: { $lte: toDate } }, { [KEY_ACCOUNT[type]]: accountNumber }] };
    if (fromDate) matchCond.$and.push({ [KEY_TIME[type]]: { $gte: fromDate } });

    switch (type) {
      case LIST_TRANSACTION_TYPE.SEND:
      case LIST_TRANSACTION_TYPE.RECEIVE: {
        [count, payload] = await Promise.all([
          TransactionModel.countDocuments(matchCond),
          TransactionModel.find(matchCond).sort(SORT_ORDER[order])
            .skip(skip).limit(limit)
            .lean()
        ]);
        break;
      }
      case LIST_TRANSACTION_TYPE.DEBT: {
        [count, payload] = await Promise.all([
          DebtModel.countDocuments(matchCond),
          DebtModel.find(matchCond).sort(SORT_ORDER[order])
            .skip(skip).limit(limit)
            .lean()
        ]);
        break;
      }
      default:
        return errorMessage(404, 'INVALID TYPE');
    }

    return [count, payload];
  } catch (error) {
    return errorMessage(500, error);
  }
}
