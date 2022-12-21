import mongoose from 'mongoose';
import { USER_MODEL_TYPE } from '../../utils/constant.js';

const UserLoginSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  refreshToken: { type: String, require: true },
  createDate: { type: String, default: new Date() },
  userId: { type: mongoose.Types.ObjectId, refPath: 'userInfoModel', require: true },
  userInfoModel: { type: String, require: true, enum: Object.values(USER_MODEL_TYPE) }
}, { collection: 'UserLogin', versionKey: false });

export default mongoose.model('UserLogin', UserLoginSchema);
