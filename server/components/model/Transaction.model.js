import mongoose from 'mongoose';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../utils/constant.js';

const TransactionSchema = new mongoose.Schema({
  accountNumber: { type: String, require: true },
  time: { type: Date, default: Date.now(), require: true },
  transactionType: { type: String, enum: Object.values(TRANSACTION_TYPE), require: true },
  amount: { type: Number, require: true },
  fee: { type: Number, require: true },
  content: { type: String, require: true },
  status: { type: String, require: true, enum: Object.values(TRANSACTION_STATUS) },
  targetAccountOwnerName: { type: String, require: true },
  targetAccountNumber: { type: String, require: true },
  bankCode: { type: String, require: true },
  signature: { type: String }
}, { collection: 'Transactions', versionKey: false });

export default mongoose.model('Transaction', TransactionSchema);
