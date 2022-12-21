import mongoose from 'mongoose';
import { errorMessage } from '../../utils/error.js';

import TransactionModel from '../model/Transaction.model.js';
import UserInfoModel from '../model/UserInfo.model.js';
import AccountModel from '../model/Account.model.js';
import * as OTPService from '../OTP/OTP.service.js';

import { FEE_PAID_TYPE, TRANSACTION_TYPE } from '../../utils/constant.js';

export async function getList(accountNumber) {
  try {
    return await TransactionModel.find({ accountNumber });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function sendOTP(userId, amount) {
  try {
    const user = await UserInfoModel.findOne({ _id: userId });

    if (!user) return errorMessage(405, "Can't find user");

    const data = await OTPService.getTransactionOTP(user._id, 2);

    await OTPService.sendTransactionOTPEmail(data.otp, amount, user.email);

    return { message: 'OTP sent successfully' };
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function verifyTransaction(req) {
  try {
    const {
 userId, otp, feePaymentMethod, transaction
} = req.body;

    const isValidOtp = await OTPService.verifyOTP(userId, otp);

    if (!isValidOtp) return isValidOtp;

    const isValidBalance = await checkBalanceAfterSpend(transaction.accountNumber, transaction.amount, transaction.fee);

    if (!isValidBalance) return errorMessage(405, 'Your account does not have enough balance to make a transaction');

    const acceptTransaction = {
      ...transaction,
      accountId: new mongoose.Types.ObjectId(transaction.accountId),
      status: 'completed'
    };

    const data = await acceptSenderTransaction(acceptTransaction, feePaymentMethod);
    await acceptReceiverTransaction(acceptTransaction, feePaymentMethod);

    return { data };
  } catch (error) {
    return errorMessage(500, error);
  }
}

async function acceptSenderTransaction(acceptTransaction, feePaymentMethod) {
  const senderTransaction = {
    ...acceptTransaction,
    fee: feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? acceptTransaction.fee : 0
  };

  await subtractMoneyFromAccount(senderTransaction.accountNumber, senderTransaction.amount + senderTransaction.fee);

  return await TransactionModel.create(senderTransaction);
}

async function acceptReceiverTransaction(acceptTransaction, feePaymentMethod) {
  const targetAccount = await AccountModel.findOne({ accountNumber: acceptTransaction.accountNumber });

  const receiverTransaction = {
    ...acceptTransaction,
    accountNumber: acceptTransaction.targetAccountNumber,
    transactionType: TRANSACTION_TYPE.RECEIVE_TRANSFER,
    fee: feePaymentMethod === FEE_PAID_TYPE.PAID_RECEIVER ? acceptTransaction.fee : 0,
    targetAccountOwnerName: targetAccount.accountOwnerName,
    targetAccountNumber: targetAccount.accountNumber
  };

  await addMoneyToAccount(receiverTransaction.accountNumber, receiverTransaction.amount - receiverTransaction.fee);

  return await TransactionModel.create(receiverTransaction);
}

async function checkBalanceAfterSpend(accountNumber, amount, fee) {
  const account = await AccountModel.findOne({ accountNumber });

  return (account.currentBalance - amount - fee) > 0;
}

async function addMoneyToAccount(accountNumber, amount) {
  const account = await AccountModel.findOne({ accountNumber });

  console.log('add', amount);

  const { modifiedCount } = await AccountModel.updateOne({ accountNumber }, { $set: { currentBalance: account.currentBalance + amount } });

  return modifiedCount === 1;
}

async function subtractMoneyFromAccount(accountNumber, amount) {
  const account = await AccountModel.findOne({ accountNumber });

  console.log('sub', amount);

  const { modifiedCount } = await AccountModel.updateOne({ accountNumber }, { $set: { currentBalance: account.currentBalance - amount } });

  return modifiedCount === 1;
}
