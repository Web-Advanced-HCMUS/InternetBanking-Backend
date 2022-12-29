import { errorMessage } from '../../utils/error.js';
import AccountModel from '../model/Account.model.js';

export async function getAccount(accountNumber) {
  try {
    return await AccountModel.findOne({ accountNumber });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function checkBalanceAfterSpend(accountNumber, amount, fee) {
  try {
    const account = await AccountModel.findOne({ accountNumber });

    return (account.currentBalance - amount - fee) > 0;
  } catch (error) {
    return errorMessage(500, error);
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
    return errorMessage(500, error);
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
    return errorMessage(500, error);
  }
}
