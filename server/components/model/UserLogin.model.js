import mongoose from 'mongoose';

const UserLoginSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  refreshToken: { type: String, require: true },
  createDate: { type: String, default: new Date() },
  userId: { type: mongoose.Types.ObjectId, refPath: 'userInfoModel', require: true },
  userInfoModel: { type: String, require: true, enum: ['Employee', 'UserInfo'] }
}, { collection: 'UserLogin', versionKey: false });

export default mongoose.model('UserLogin', UserLoginSchema);
