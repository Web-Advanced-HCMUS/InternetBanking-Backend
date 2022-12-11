import mongoose from 'mongoose';

const UserOTPSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo' },
  otp: { type: String },
  feature: { type: String },
  expiredTime: { type: Date }
}, { collection: 'UserOTP', versionKey: false });

export default mongoose.model('UserOTP', UserOTPSchema);
