import mongoose from 'mongoose';
import { ACCOUNT_TYPE } from '../../utils/constant.js';

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  isCLosed: { type: Boolean, default: false },
  openingDate: { type: Date, default: new Date() },
  currentBalance: { type: Number, default: 0 },
  accountOwnerName: { type: String, require: true },
  accountNumber: { type: String, require: true },
  createBy: { type: mongoose.Types.ObjectId, ref: 'Employee', require: true },
  accountType: { type: String, default: ACCOUNT_TYPE.PAYMENT }
}, { collection: 'Accounts', versionKey: false });

export default mongoose.model('Account', AccountSchema);
