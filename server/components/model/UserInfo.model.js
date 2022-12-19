import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  isActivated: { type: Boolean, default: false },
  accountNumber: { type: String, require: true },
  fullName: { type: String, require: true },
  gender: { type: String, require: true },
  phone: { type: String, require: true },
  identityCard: { type: String, require: true },
  dateOfBirth: { type: String },
  email: { type: String, require: true },
  address: { type: String, require: true },
  currentBalance: { type: Number, default: 0 },
  createDate: { type: Date, default: new Date() },
  lastUpdate: { type: Date, default: null }
}, { collection: 'UserInfo', versionKey: false });

export default mongoose.model('UserInfo', UserInfoSchema);
