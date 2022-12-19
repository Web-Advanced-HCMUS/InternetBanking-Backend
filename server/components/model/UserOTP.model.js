import mongoose from 'mongoose';

const UserOTPSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, refPath: 'userInfoModel', require: true },
  userInfoModel: { type: String, require: true, enum: ['Employee', 'UserInfo'] },
  otp: { type: String },
  feature: { type: String },
  expiredTime: { type: Date }
}, { collection: 'UserOTP', versionKey: false });

export default mongoose.model('UserOTP', UserOTPSchema);
