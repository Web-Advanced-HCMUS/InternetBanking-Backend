import mongoose from 'mongoose';
import { TRANSACTION_TYPE } from '../../utils/constant.js';

const TransactionSchema = new mongoose.Schema({
  accountID: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  time: { type: Date, default: Date.now(), require: true },
  transactionType: { type: String, enum: Object.values(TRANSACTION_TYPE), require: true },
  amount: { type: Number, require: true },
  newBalance: { type: Number, require: true },
  content: { type: String, require: true },
  status: { type: String, require: true },
  targetUserName: { type: String },
  targetAccountNumber: { type: String },
  interbank: { type: mongoose.Types.ObjectId, ref: 'Interbank' }
}, { collection: 'Transactions', versionKey: false });

export default mongoose.model('Transaction', TransactionSchema);
