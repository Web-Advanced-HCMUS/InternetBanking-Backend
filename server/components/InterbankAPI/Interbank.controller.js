import * as InterbankService from './Interbank.service.js';
import * as TransactionService from '../Transaction/Transaction.service.js';
import { verifyInterbankDeposit } from './Interbank.service.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import * as AccountController from '../Account/Account.controller.js';

export async function getAccount(req, res, next) {
    await AccountController.getAccount(req, res, next);
}

export async function rsaDeposit(req, res, next) {
    try {
        const [err1, requestBody] = await HandleRequest(InterbankService.verifyInterbankDeposit(req, next));
        if (err1) throw new APIError(err1.statusCode, err1.message);

        const [err2, acceptTransaction] = await HandleRequest(TransactionService.createInterbankTransaction(requestBody.data, requestBody.signature));
        if (err2) throw new APIError(err2.statusCode, err2.message);

        const [err3, data] = await HandleRequest(InterbankService.acceptInterbankTransaction(acceptTransaction));
        if (err3) throw new APIError(err3.statusCode, err3.message);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function verifySignature(req, res, next) {
    try {
        const [err, data] = await HandleRequest(InterbankService.verifySignature(req.body.data, req.body.signature, req.body.publicKey));
        if (err) throw new APIError(err.statusCode, err.message);

        return res.RH.success({ status: data });
    } catch (error) {
        next(error);
    }
}

export async function getKeyPair(req, res, next) {
    try {
        const data = await InterbankService.getKeyPair();

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function sign(req, res, next) {
    try {
        const data = await InterbankService.getSignature(req.body.data, req.body.privateKey);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}
