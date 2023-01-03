import * as OTPService from './OTP.service.js';

export async function getTransactionOTP(req, res) {
    try {
        const data = await OTPService.sendTransactionOTP(req.body.userId, req.body.amount);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}
