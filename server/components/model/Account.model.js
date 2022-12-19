import mongoose from 'mongoose';
import { ACCOUNT_TYPE } from '../../utils/constant.js';

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  openingDate: { type: Date, default: new Date() },
  currentBalance: { type: Number, default: 0 },
  accountType: { type: String, enum: Object.values(ACCOUNT_TYPE), require: true }
}, { collection: 'Accounts', versionKey: false });

export default mongoose.model('Account', AccountSchema);
