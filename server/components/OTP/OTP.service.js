import mongoose from 'mongoose';
import UserOTPModel from '../model/UserOTP.model.js';
import { OTP_STATUS } from '../../utils/constant.js';
import { errorMessage } from '../../utils/error.js';
import { nodeMailerSendEmail } from '../../helper/mailer.js';
import { transactionOTPMail } from '../../utils/mailTemplate/transactionOTP.mailTemplate.js';
import UserInfoModel from '../model/UserInfo.model.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';

const generateOTP = function () {
    return Math.floor(100000 + Math.random() * 900000);
};

export async function sendTransactionOTP(userId, amount) {
    try {
        const user = await UserInfoModel.findOne({ _id: userId });

        if (!user) return errorMessage(200, "Can't find user");

        const [err, otp] = await HandleRequest(getOTP(user._id, 2));
        if (err) throw new APIError(err.statusCode, err.message);

        // await nodeMailerSendEmail(
        //     user.email,
        //     'Internet Banking OTP',
        //     null,
        //     transactionOTPMail(otp, amount),
        //     null
        // );

        return { message: `OTP sent successfully ${otp}` };
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function getOTP(userId, minute) {
    try {
        const otpInfo = {
            userId: new mongoose.Types.ObjectId(userId),
            otp: generateOTP().toString(),
            status: OTP_STATUS.PENDING,
            expiredTime: Date.now() + minute * 60 * 1000
        };

        await UserOTPModel.deleteMany({ userId });

        await UserOTPModel.create(otpInfo);

        return otpInfo.otp;
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}

export async function verifyOTP(userId, otp) {
    try {
        const validOTP = await UserOTPModel.findOne({ userId, otp, status: OTP_STATUS.PENDING });

        if (!validOTP) throw new APIError(200, 'WRONG OTP');

        if (Date.now() > validOTP.expiredTime) throw new APIError(200, 'OTP EXPIRED');

        return await UserOTPModel.updateOne({ _id: validOTP._id }, { $set: { status: OTP_STATUS.CONFIRM } });
    } catch (error) {
        throw new APIError(error.statusCode || error.code || 500, error.message);
    }
}
