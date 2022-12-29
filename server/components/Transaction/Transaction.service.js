import TransactionModel from '../model/Transaction.model.js';
import * as AccountService from '../Account/Account.service.js';
import * as OTPService from '../OTP/OTP.service.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import {
 BANK, FEE_PAID_TYPE, TRANSACTION_STATUS, TRANSACTION_TYPE
} from '../../utils/constant.js';

export async function getList(accountNumber) {
  try {
    return await TransactionModel.find({ accountNumber });
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createInterbankTransaction(data, signature) {
  try {
    const acceptTransaction = {
      ...data,
      status: TRANSACTION_STATUS.SUCCESS,
      bankName: data.bankCode,
      signature
    };

    const [err, receiverTransaction] = await HandleRequest(acceptReceiverTransaction(acceptTransaction));
    if (err) throw new APIError(err.statusCode, err.message);

    return { transaction: receiverTransaction };
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createInternalTransaction(data) {
    try {
      const acceptTransaction = {
        ...data,
        status: TRANSACTION_STATUS.SUCCESS,
        bankName: BANK.CODE
      };

      const [err1, senderTransaction] = await HandleRequest(acceptSenderTransaction({
        ...acceptTransaction,
        fee: data.feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? acceptTransaction.fee : 0
      }));
      if (err1) throw new APIError(err1.statusCode, err1.message);

      const [err2, receiverTransaction] = await HandleRequest(acceptReceiverTransaction({
        ...acceptTransaction,
        transactionType: TRANSACTION_TYPE.RECEIVE_TRANSFER,
        fee: data.feePaymentMethod === FEE_PAID_TYPE.PAID_RECEIVER ? acceptTransaction.fee : 0
      }));
      if (err2) throw new APIError(err1.statusCode, err1.message);

      return { transaction: senderTransaction };
    } catch (error) {
      throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyTransaction(data) {
  try {
    const { userId, otp, fromAccountNumber, toAccountNumber, amount, fee } = data;

    const [err1, isSuccess] = await HandleRequest(OTPService.verifyOTP(userId, otp));
    if (err1) throw new APIError(err1.statusCode, err1.message);

    const [err2, account] = await HandleRequest(AccountService.getAccount(toAccountNumber));
    if (err2) throw new APIError(err2.statusCode, err2.message);
    if (account === null) throw new APIError(200, 'Target account number does not exist in system');

    const [err3, isValidBalance] = await HandleRequest(AccountService.checkBalanceAfterSpend(fromAccountNumber, amount, fee));
    if (err3) throw new APIError(err3.statusCode, err3.message);
    if (isValidBalance !== true) throw new APIError(200, 'Your account does not have enough balance to make a transaction');

    return data;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

async function acceptSenderTransaction(acceptTransaction) {
  try {
    const senderTransaction = {
      ...acceptTransaction,
      accountNumber: acceptTransaction.fromAccountNumber,
      targetAccountNumber: acceptTransaction.toAccountNumber,
      targetAccountOwnerName: acceptTransaction.toAccountOwnerName
    };

    const [err, result] = await HandleRequest(AccountService.subtractMoneyFromAccount(
      senderTransaction.accountNumber,
      senderTransaction.amount + senderTransaction.fee
    ));
    if (err) throw new APIError(err.statusCode, err.message);

    return await TransactionModel.create(senderTransaction);
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

async function acceptReceiverTransaction(acceptTransaction) {
  try {
    const receiverTransaction = {
      ...acceptTransaction,
      accountNumber: acceptTransaction.toAccountNumber,
      targetAccountOwnerName: acceptTransaction.fromAccountOwnerName,
      targetAccountNumber: acceptTransaction.fromAccountNumber
    };

    const [err, result] = await HandleRequest(AccountService.addMoneyToAccount(
      receiverTransaction.accountNumber,
      receiverTransaction.amount - receiverTransaction.fee
    ));
    if (err) throw new APIError(err.statusCode, err.message);

    return await TransactionModel.create(receiverTransaction);
  } catch (error) {
    throw new APIError(error.statusCode || 500, error.message);
  }
}
