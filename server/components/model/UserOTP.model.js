import mongoose from 'mongoose';
import { USER_MODEL_TYPE } from '../../utils/constant.js';

const UserOTPSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, refPath: 'userInfoModel', require: true },
  userInfoModel: { type: String, require: true, enum: Object.values(USER_MODEL_TYPE) },
  otp: { type: String },
  feature: { type: String },
  expiredTime: { type: Date }
}, { collection: 'UserOTP', versionKey: false });

export default mongoose.model('UserOTP', UserOTPSchema);
