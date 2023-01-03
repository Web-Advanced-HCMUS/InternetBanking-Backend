import mongoose from 'mongoose';
import { OTP_STATUS } from '../../utils/constant.js';

const UserOTPSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  otp: { type: String },
  status: { type: String, enum: Object.values(OTP_STATUS) },
  expiredTime: { type: Date }
}, { collection: 'UserOTP', versionKey: false });

export default mongoose.model('UserOTP', UserOTPSchema);
