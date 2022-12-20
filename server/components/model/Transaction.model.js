import mongoose from 'mongoose';
import { TRANSACTION_TYPE } from '../../utils/constant.js';

const TransactionSchema = new mongoose.Schema({
  accountNumber: { type: String, require: true },
  date: { type: Date, default: Date.now(), require: true },
  transactionType: { type: String, enum: Object.values(TRANSACTION_TYPE), require: true },
  amount: { type: Number, require: true },
  fee: { type: Number, require: true },
  content: { type: String, require: true },
  status: { type: String, require: true },
  targetAccountOwnerName: { type: String, require: true },
  targetAccountNumber: { type: String, require: true },
  bankName: { type: String, require: true }
}, { collection: 'Transactions', versionKey: false });

export default mongoose.model('Transaction', TransactionSchema);
