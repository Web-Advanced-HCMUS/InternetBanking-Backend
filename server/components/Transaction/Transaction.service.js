import mongoose from 'mongoose';
import { errorMessage } from '../../utils/error.js';

import TransactionModel from '../model/Transaction.model.js';
import AccountModel from '../model/Account.model.js';
import * as AccountService from '../Account/Account.service.js';
import * as OTPService from '../OTP/OTP.service.js';

import {
 BANK, FEE_PAID_TYPE, TRANSACTION_STATUS, TRANSACTION_TYPE
} from '../../utils/constant.js';

export async function getList(accountNumber) {
  try {
    return await TransactionModel.find({ accountNumber });
  } catch (error) {
    return errorMessage(500, error);
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

    const receiverTransaction = await acceptReceiverTransaction(acceptTransaction);

    return { transaction: receiverTransaction };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function createInternalTransaction(data) {
    try {
      const acceptTransaction = {
        ...data,
        status: TRANSACTION_STATUS.SUCCESS,
        bankName: BANK.CODE
      };

      const senderTransaction = await acceptSenderTransaction({
        ...acceptTransaction,
        fee: data.feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? acceptTransaction.fee : 0
      });

      await acceptReceiverTransaction({
        ...acceptTransaction,
        transactionType: TRANSACTION_TYPE.RECEIVE_TRANSFER,
        fee: data.feePaymentMethod === FEE_PAID_TYPE.PAID_RECEIVER ? acceptTransaction.fee : 0
      });

      return { transaction: senderTransaction };
    } catch (error) {
      return errorMessage(500, error);
    }
}

export async function verifyTransaction(data) {
  try {
    const {
 userId, otp, fromAccountNumber, toAccountNumber, amount, fee
} = data;

    await OTPService.verifyOTP(userId, otp);

    const account = await AccountService.getAccount(toAccountNumber);
    if (account === null) return errorMessage(405, 'Target account number does not exist in system');

    const isValidBalance = await AccountService.checkBalanceAfterSpend(fromAccountNumber, amount, fee);
    if (isValidBalance !== true) return errorMessage(405, 'Your account does not have enough balance to make a transaction');

    return data;
  } catch (error) {
    return errorMessage(500, error);
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

    await AccountService.subtractMoneyFromAccount(senderTransaction.accountNumber, senderTransaction.amount + senderTransaction.fee);

    return await TransactionModel.create(senderTransaction);
  } catch (error) {
    return errorMessage(500, error);
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

    await AccountService.addMoneyToAccount(receiverTransaction.accountNumber, receiverTransaction.amount - receiverTransaction.fee);

    return await TransactionModel.create(receiverTransaction);
  } catch (error) {
    return errorMessage(500, error);
  }
}
