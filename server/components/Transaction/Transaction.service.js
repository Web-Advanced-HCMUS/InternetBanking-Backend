import TransactionModel from '../model/Transaction.model.js';
import * as AccountService from '../Account/Account.service.js';
import * as OTPService from '../OTP/OTP.service.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import {
 BANK_CODE, FEE_PAID_TYPE, TRANSACTION_STATUS, TRANSACTION_TYPE
} from '../../utils/constant.js';

export async function getList(accountNumber, type) {
  try {
    if (type === 'receive') return await TransactionModel.find({ toAccountNumber: accountNumber });
    if (type === 'spend') return await TransactionModel.find({ fromAccountNumber: accountNumber });

    if (type === 'all') await TransactionModel.find({ $or: [{ fromAccountNumber: accountNumber }, { toAccountNumber: accountNumber }] });

    return [];
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createInterbankTransferTransaction(responseTransaction) {
  try {
    const feePaymentMethod = responseTransaction.fee > 0 ? FEE_PAID_TYPE.PAID_RECEIVER : FEE_PAID_TYPE.PAID_SENDER;
    const [err1, receiverResult] = await HandleRequest(AccountService.subtractMoneyFromAccount(
        responseTransaction.fromAccountNumber,
        responseTransaction.amount + responseTransaction.fee
    ));

    const [err2, transaction] = await HandleRequest(TransactionModel.create({ ...responseTransaction, feePaymentMethod }));
    if (err2) throw new APIError(err2.statusCode, err2.message);

    return transaction;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createInterbankDepositTransaction(data, signature) {
  try {
    const feePaymentMethod = data.fee > 0 ? FEE_PAID_TYPE.PAID_RECEIVER : FEE_PAID_TYPE.PAID_SENDER;
    const [err1, receiverResult] = await HandleRequest(AccountService.addMoneyToAccount(
        data.toAccountNumber,
        data.amount - data.fee
    ));

    const acceptTransaction = {
      ...data,
      bankCode: data.bankCode,
      feePaymentMethod,
      transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER,
      status: TRANSACTION_STATUS.SUCCESS,
      signature
    };
    let transaction = acceptTransaction;
    if (receiverResult?.modifiedCount === 0 || err1) {
      acceptTransaction.status = TRANSACTION_STATUS.FAIL;
      acceptTransaction.message = `Error occur while operate transaction - ${err1.message}`;
    } else {
      const [err2, rs] = await HandleRequest(TransactionModel.create(acceptTransaction));
      if (err2) throw new APIError(err2.statusCode, err2.message);

      transaction = rs;
    }

    return transaction;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createInternalTransaction(data) {
    try {
      const senderFee = data.feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? data.fee : 0;
      const [err, senderResult] = await HandleRequest(AccountService.subtractMoneyFromAccount(
          data.fromAccountNumber,
          data.amount + senderFee
      ));
      if (err) throw new APIError(err.statusCode, err.message);
      if (senderResult.modifiedCount === 0) throw new APIError(500, 'Error occur while operating transaction');

      const receiverFee = data.feePaymentMethod === FEE_PAID_TYPE.PAID_RECEIVER ? data.fee : 0;
      const [err2, receiverResult] = await HandleRequest(AccountService.addMoneyToAccount(
          data.toAccountNumber,
          data.amount - receiverFee
      ));
      if (err2) throw new APIError(err2.statusCode, err2.message);
      if (receiverResult.modifiedCount === 0) throw new APIError(500, 'Error occur while operating transaction');

      const acceptTransaction = {
        ...data,
        status: TRANSACTION_STATUS.SUCCESS,
      };
      const [err3, transaction] = await HandleRequest(TransactionModel.create(acceptTransaction));
      if (err3) throw new APIError(err3.statusCode, err3.message);

      return { data: transaction };
    } catch (error) {
      throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyInternalTransaction(data) {
  try {
    const { userId, otp, fromAccountNumber, toAccountNumber, amount, fee, feePaymentMethod } = data;

    const [err1, modifiedCount] = await HandleRequest(OTPService.verifyOTP(userId, otp));
    if (err1) throw new APIError(err1.statusCode, err1.message);
    if (modifiedCount === 0) throw new APIError(400, 'Error occur while verify OTP');

    const [err2, fromAccount] = await HandleRequest(AccountService.getAccount(fromAccountNumber));
    if (err2) throw new APIError(err2.statusCode, err2.message);
    if (!fromAccount) throw new APIError(400, 'Account operates transaction is not exist in system');

    const [err3, toAccount] = await HandleRequest(AccountService.getAccount(toAccountNumber));
    if (err3) throw new APIError(err3.statusCode, err3.message);
    if (!toAccount) throw new APIError(400, 'Beneficiary account is not exist in system');

    const senderFee = feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? fee : 0;
    const [err4, isValidBalance] = await HandleRequest(AccountService.checkBalanceAfterSpend(fromAccountNumber, amount, senderFee));
    if (err4) throw new APIError(err4.statusCode, err4.message);
    if (!isValidBalance) throw new APIError(400, 'Your account does not have enough balance to make a transaction');

    return {
      ...data,
      fromAccountOwnerName: fromAccount.accountOwnerName,
      toAccountOwnerName: toAccount.accountOwnerName,
      transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER,
      bankCode: BANK_CODE.MY_BANK
    };
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}
