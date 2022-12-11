import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  username: { type: String },
  isActived: { type: Boolean, default: false },
  role: { type: String, ref: 'RoleManagement' },
  accountNumber: { type: String, require: true },
  password: { type: String, require: true },
  fullName: { type: String, require: true },
  gender: { type: String, require: true },
  phone: { type: String, require: true },
  identityCard: { type: String, require: true },
  dateOfBirth: { type: String },
  email: { type: String, require: true },
  address: { type: String, require: true },
  currentBalance: { type: Number, default: 0 },
  createDate: { type: Date, default: new Date() },
  lastUpdate: { type: Date, default: null },
  beneficiaries: [{
    remindedName: { type: String, required: true },
    accountNumber: { type: String, required: true }
  }]
}, { collection: 'UserInfo', versionKey: false });

export default mongoose.model('UserInfo', UserInfoSchema);
