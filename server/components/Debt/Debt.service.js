import DebtModel from '../model/Debt.model.js';
import AccountModel from '../model/Account.model.js';
import * as AccountService from '../Account/Account.service.js';
import * as TransactionService from '../Transaction/Transaction.service.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import {
 BANK_CODE, DEBT_STATUS, DEBT_TYPE, FEE_PAID_TYPE, TRANSACTION_TYPE
} from '../../utils/constant.js';
import * as OTPService from '../OTP/OTP.service.js';

const getUserFromId = (onlineUsers, socketId) => onlineUsers.find((user) => user.socketId.toString() === socketId.toString());

const getUserFromAN = (onlineUsers, accountNumber) => onlineUsers.find((user) => user.accountNumber.toString() === accountNumber.toString());

export async function getList(accountNumber, debtType) {
  try {
    if (debtType === DEBT_TYPE.CREDITOR) return await DebtModel.find({ creditorAccountNumber: accountNumber });

    if (debtType === DEBT_TYPE.DEBTOR) return await DebtModel.find({ debtorAccountNumber: accountNumber });

    if (debtType === 'all') return await DebtModel.find({ $or: [{ creditorAccountNumber: accountNumber }, { debtorAccountNumber: accountNumber }] });

    return [];
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function createDebtPayment(req, data) {
    try {
        const { debt } = data;

        const requestBody = {
            fromAccountNumber: debt.debtorAccountNumber,
            fromAccountOwnerName: debt.fromAccountOwnerName,
            toAccountNumber: debt.creditorAccountNumber,
            toAccountOwnerName: debt.toAccountOwnerName,
            transactionType: TRANSACTION_TYPE.PAY_DEBT,
            feePaymentMethod: FEE_PAID_TYPE.PAID_SENDER,
            amount: debt.amountOwed,
            fee: 0,
            content: debt.content,
            time: Date.now(),
            bank: BANK_CODE.MY_BANK
        };

        const [err1, transaction] = await HandleRequest(TransactionService.createInternalTransaction(requestBody));
        if (err1) throw new APIError(err1.statusCode, err1.message);

        const [err2, debtUpdateResult] = await HandleRequest(DebtModel.updateOne({ _id: debt._id }, { status: DEBT_STATUS.COMPLETE }));
        if (err2) throw new APIError(err2.statusCode, err2.message);
        if (debtUpdateResult === 0) throw new APIError(400, 'Error occur while operate debt payment transaction');

        const [err3, paidDebt] = await HandleRequest(DebtModel.findById(debt._id));
        if (err3) throw new APIError(err3.statusCode, err3.message);

        const socket = req.app.get('socket_io');
        const onlineUsers = req.app.get('user_online');

        const onlineUser = getUserFromAN(onlineUsers, paidDebt.creditorAccountNumber);
        if (onlineUser) {
            socket.to(onlineUser.socketId)
                .emit('pay_debt', {
                        debtorAccountNumber: paidDebt.debtorAccountNumber,
                        debtId: paidDebt._id,
                        content: paidDebt.content
                    });
        }

        return { data: paidDebt };
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyDebtPaymentRequest(debtId, data) {
    try {
        const { fromAccountNumber, userId, otp } = data;

        const [err1, debtorAccount] = await HandleRequest(AccountModel.findOne({ userId, accountNumber: fromAccountNumber }));
        if (err1) throw new APIError(err1.statusCode, err1.message);
        if (!debtorAccount) throw new APIError(400, 'User or account is not exist in system');

        const [err2, modifiedCount] = await HandleRequest(OTPService.verifyOTP(userId, otp));
        if (err2) throw new APIError(err2.statusCode, err2.message);

        const [err3, debt] = await HandleRequest(DebtModel.findById(debtId));
        if (err3) throw new APIError(err3.statusCode, err3.message);
        if (!debt) throw new APIError(400, 'Debt is not exist in system');
        if (fromAccountNumber !== debt.debtorAccountNumber) throw new APIError(400, 'Account is not debtor');

        if (debt.status === DEBT_STATUS.COMPLETE) throw new APIError(400, 'Debt is paid');

        if (debt.status === DEBT_STATUS.CANCEL) throw new APIError(400, 'Debt is canceled');

        const [err4, creditorAccount] = await HandleRequest(AccountModel.findOne({ accountNumber: debt.creditorAccountNumber }));
        if (err4) throw new APIError(err4.statusCode, err4.message);

        return {
            ...data,
            debt: {
                ...debt._doc,
                fromAccountOwnerName: debtorAccount.accountOwnerName,
                toAccountOwnerName: creditorAccount.accountOwnerName
            }
        };
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function cancelDebt(req, data) {
    try {
        const socket = req.app.get('socket_io');
        const onlineUsers = req.app.get('user_online');

        const { fromAccountNumber, content, debt } = data;
        let { status } = debt;

        if (fromAccountNumber === debt.creditorAccountNumber) {
            const [err1, modifiedCount] = await HandleRequest(DebtModel.updateOne({ _id: debt._id }, { status: DEBT_STATUS.CANCEL }));
            if (err1) throw new APIError(err1.statusCode, err1.message);
            if (modifiedCount === 0) throw new APIError(400, 'No change in debt, please re-check again');

            status = DEBT_STATUS.CANCEL;

            const onlineUser = getUserFromAN(onlineUsers, debt.debtorAccountNumber);
            if (onlineUser) {
                socket.to(onlineUser.socketId)
                    .emit('cancel_debt_from_creditor', {
                        creditorAccountNumber: debt.creditorAccountNumber,
                        debtId: debt._id,
                        content
                    });
            }
        }

        if (fromAccountNumber === debt.debtorAccountNumber) {
            const onlineUser = getUserFromAN(onlineUsers, debt.creditorAccountNumber);
            if (onlineUser) {
                socket.to(onlineUser.socketId)
                    .emit('cancel_debt_from_debtor', {
                        debtorAccountNumber: debt.debtorAccountNumber,
                        debtId: debt._id,
                        content
                    });
            }
        }

        return {
            ...data,
            debt: {
                ...data.debt,
                status
            }
        };
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyCancelDebtRequest(debtId, data) {
    try {
        const { fromAccountNumber } = data;

        const [err1, debt] = await HandleRequest(DebtModel.findById(debtId));
        if (err1) throw new APIError(err1.statusCode, err1.message);
        if (!debt) throw new APIError(400, 'Debt is not exist in system');

        const [err2, targetUser] = await HandleRequest(AccountService.getAccount(fromAccountNumber));
        if (err2) throw new APIError(err2.statusCode, err2.message);
        if (!targetUser) throw new APIError(400, 'Account operates cancel action is not exist in system');

        return { ...data, debt: debt._doc };
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function createDebt(req, data) {
    try {
      const acceptedDebt = {
        ...data,
        status: DEBT_STATUS.INCOMPLETE,
      };

      const [err1, createdDebt] = await HandleRequest(DebtModel.create(acceptedDebt));
      if (err1) throw new APIError(err1.statusCode, err1.message);

      const socket = req.app.get('socket_io');
      const onlineUsers = req.app.get('user_online');

      const onlineUser = getUserFromAN(onlineUsers, createdDebt.debtorAccountNumber);

      if (onlineUser) {
          socket.to(onlineUser.socketId)
              .emit('create_debt', {
                  creditorAccountNumber: createdDebt.creditorAccountNumber,
                  debtId: createdDebt._id,
                  content: createdDebt.content
              });
      }

        return { data: createdDebt };
    } catch (error) {
      throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyCreateDebtRequest(data) {
  try {
    const {
        creditorAccountNumber, debtorAccountNumber, startDate, endDate
} = data;

    const [err1, creditorAccount] = await HandleRequest(AccountService.getAccount(creditorAccountNumber));
    if (err1) throw new APIError(err1.statusCode, err1.message);
    if (!creditorAccount) throw new APIError(400, "User' account creates debt is not exist in system");

    const [err2, debtorAccount] = await HandleRequest(AccountService.getAccount(debtorAccountNumber));
    if (err2) throw new APIError(err2.statusCode, err2.message);
    if (!debtorAccount) throw new APIError(400, 'Debtor account is not exist in system');

    if (startDate > endDate) throw new APIError(400, 'Start date greater than end date');

    return data;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}
