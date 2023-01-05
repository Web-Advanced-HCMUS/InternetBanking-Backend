import { errorMessage } from '../../utils/error';

import EmployeeModel from '../model/Employee.model';
import TransactionModel from '../model/Transaction.model';
import UserLoginModel from '../model/UserLogin.model';
import AccountModel from '../model/Account.model';

import { TRANSACTION_TYPE, FEE_PAID_TYPE, TRANSACTION_STATUS } from '../../utils/constant';

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

export async function transactionHistoryService(body, skip, limit) {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error);
  }
}
