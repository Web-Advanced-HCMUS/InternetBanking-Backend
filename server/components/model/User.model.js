import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  username: { type: String },
  role: { type: mongoose.Types.ObjectId, ref: 'RoleManagement' },
  password: { type: String },
  phone: { type: String },
  dateOfBirth: { type: String },
  email: { type: String },
  balance: { type: Number }
}, { collection: 'UserInfo', versionKey: false });

export default mongoose.model('UserInfo', UserInfoSchema);
