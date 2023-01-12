import { errorMessage } from '../../utils/error.js';
import AccountModel from '../model/Account.model.js';
import APIError from '../../utils/APIError.js';
import { ACCOUNT_TYPE } from '../../utils/constant.js';

export async function getAccountFromUserId(userId) {
  try {
    return await AccountModel.findOne({ userId, accountType: ACCOUNT_TYPE.PAYMENT });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function getAccountListFromUserId(userId) {
  try {
    return await AccountModel.find({ userId });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function getAccount(accountNumber) {
  try {
    return await AccountModel.findOne({ accountNumber });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function checkBalanceAfterSpend(accountNumber, amount, fee) {
  try {
    const account = await AccountModel.findOne({ accountNumber });

    return (account.currentBalance - amount - fee) > 0;
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function addMoneyToAccount(accountNumber, amount) {
  try {
    const account = await AccountModel.findOne({ accountNumber });

    return await AccountModel.updateOne(
      { accountNumber },
      { $set: { currentBalance: account.currentBalance + amount } }
    );
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function subtractMoneyFromAccount(accountNumber, amount) {
  try {
    const account = await AccountModel.findOne({ accountNumber });

    return await AccountModel.updateOne(
      { accountNumber },
      { $set: { currentBalance: account.currentBalance - amount } }
    );
  } catch (error) {
    throw new APIError(500, error.message);
  }
}
