import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  username: { type: String },
  role: { type: mongoose.Types.ObjectId, ref: 'RoleManagement' },
  accountNumber: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: String },
  dateOfBirth: { type: String },
  email: { type: String },
  currentBalance: { type: Number, default: 0 },
  beneficiaries: [{
    remindedName: { type: String },
    accountNumber: { type: String }
  }]
}, { collection: 'UserInfo', versionKey: false });

export default mongoose.model('UserInfo', UserInfoSchema);
