import * as AccountService from './Account.service.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import APIError from '../../utils/APIError.js';
import { BANK } from '../../utils/constant.js';

export async function getAccount(req, res, next) {
    try {
        const [err, data] = await HandleRequest(AccountService.getAccount(req.params.accountNumber));
        if (err) throw new APIError(400, err);

        if (!data) throw new APIError(400, 'Account is not exist in system');

        const info = {
            accountNumber: data.accountNumber,
            accountOwnerName: data.accountOwnerName,
            bankCode: BANK.CODE
        };

        return res.RH.success(info);
    } catch (error) {
        next(error);
    }
}
