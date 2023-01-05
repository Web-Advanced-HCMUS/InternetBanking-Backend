import * as TransactionService from './Transaction.service.js';
import * as AccountService from '../Account/Account.service.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import APIError from '../../utils/APIError.js';

export async function getListTransaction(req, res, next) {
    try {
        const [err1, validAccount] = await HandleRequest(AccountService.getAccount(req.params.accountNumber));
        if (err1) throw new APIError(err1.statusCode, err1.message);
        if (!validAccount) throw new APIError(400, 'Account is not exist in system');

        const [err2, data] = await HandleRequest(TransactionService.getList(req.params.accountNumber, req.query.type));
        if (err2) throw new APIError(err2.statusCode, err2.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function insertOneTransaction(req, res, next) {
    try {
        const [err1, requestBody] = await HandleRequest(TransactionService.verifyInternalTransaction(req.body));
        if (err1) throw new APIError(err1.statusCode, err1.message);

        const [err2, data] = await HandleRequest(TransactionService.createInternalTransaction(requestBody));
        if (err2) throw new APIError(err2.statusCode, err2.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}
