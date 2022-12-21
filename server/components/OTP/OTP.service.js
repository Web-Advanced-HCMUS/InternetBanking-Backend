import mongoose from 'mongoose';
import moment from 'moment';
import UserOTPModel from '../model/UserOTP.model.js';
import { OTP_STATUS } from '../../utils/constant.js';
import { errorMessage } from '../../utils/error.js';
import { nodeMailerSendEmail } from '../../helper/mailer.js';
import { transactionOTPMail } from '../../utils/mailTemplate/transactionOTP.mailTemplate.js';

const generateOTP = function () {
    return Math.floor(100000 + Math.random() * 900000);
};

export async function getTransactionOTP(userId, minute) {
    const otpInfo = {
        userId: new mongoose.Types.ObjectId(userId),
        otp: generateOTP().toString(),
        status: OTP_STATUS.PENDING,
        expiredTime: Date.now() + minute * 60 * 1000
    };

    await UserOTPModel.deleteMany({ userId });

    await UserOTPModel.create(otpInfo);

    return {
        otp: otpInfo.otp
    };
}

export async function sendTransactionOTPEmail(otp, amount, email) {
    try {
        await nodeMailerSendEmail(
            'Internet Banking OTP',
            email,
            null,
            'Internet Banking OTP',
            transactionOTPMail(otp, amount)
        );
    } catch (err) {
        console.log(err);
    }
}

export async function verifyOTP(userId, otp) {
    const validOTP = await UserOTPModel.findOne({ userId, otp, status: OTP_STATUS.PENDING });

    if (!validOTP) return errorMessage(405, 'WRONG OTP!');

    if (Date.now() > validOTP.expiredTime) return errorMessage(405, 'OTP EXPIRED!');

    await UserOTPModel.updateOne({ _id: validOTP._id }, { $set: { status: OTP_STATUS.CONFIRM } });

    return true;
}
