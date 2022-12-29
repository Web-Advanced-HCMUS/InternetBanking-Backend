import * as TransactionService from './Transaction.service.js';

export async function getListTransaction(req, res, next) {
    try {
        const data = await TransactionService.getList(req.params.accountNumber);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function insertOneTransaction(req, res, next) {
    try {
        const requestBody = await TransactionService.verifyTransaction(req.body);

        const data = await TransactionService.createInternalTransaction(requestBody);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}
