import * as DebtService from './Debt.service.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import APIError from '../../utils/APIError.js';

export async function getDebtList(req, res, next) {
    try {
        const [err1, data] = await HandleRequest(DebtService.getList(req.params.accountNumber, req.query.debtType));
        if (err1) throw new APIError(400, err1.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function createDebt(req, res, next) {
    try {
        const [err1, requestBody] = await HandleRequest(DebtService.verifyCreateDebtRequest(req.body));
        if (err1) throw new APIError(400, err1.message);

        const [err2, data] = await HandleRequest(DebtService.createDebt(req, requestBody));
        if (err2) throw new APIError(400, err2.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function requestCancelDebt(req, res, next) {
    try {
        const [err1, debt] = await HandleRequest(DebtService.verifyCancelDebtRequest(req.params.debtId, req.body));
        if (err1) throw new APIError(400, err1.message);

        const [err2, data] = await HandleRequest(DebtService.cancelDebt(req, debt));
        if (err2) throw new APIError(400, err2.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function payDebt(req, res, next) {
    try {
        const [err1, requestBody] = await HandleRequest(DebtService.verifyDebtPaymentRequest(req.params.debtId, req.body));
        if (err1) throw new APIError(400, err1.message);

        const [err2, data] = await HandleRequest(DebtService.createDebtPayment(req, requestBody));
        if (err2) throw new APIError(400, err2.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}
