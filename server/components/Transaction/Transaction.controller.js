import * as TransactionService from './Transaction.service.js';

export async function getOTP(req, res) {
    try {
        const data = await TransactionService.sendOTP(req.body.userId, req.body.amount);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListTransaction(req, res) {
    try {
        const data = await TransactionService.getList(req.params.accountNumber);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function insertOneTransaction(req, res) {
    try {
        const data = await TransactionService.verifyTransaction(req);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}
