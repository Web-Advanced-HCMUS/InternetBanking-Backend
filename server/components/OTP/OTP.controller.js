import * as OTPService from './OTP.service.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import APIError from '../../utils/APIError.js';

export async function getTransactionOTP(req, res, next) {
    try {
        const [err, data] = await HandleRequest(OTPService.sendTransactionOTP(req.body.userId, req.body.amount));
        if (err) throw new APIError(400, err);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}
