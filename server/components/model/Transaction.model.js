import mongoose from 'mongoose';
import { FEE_PAID_TYPE, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../utils/constant.js';

const TransactionSchema = new mongoose.Schema({
  fromAccountNumber: { type: String, require: true },
  fromAccountOwnerName: { type: String, require: true },
  toAccountOwnerName: { type: String, require: true },
  toAccountNumber: { type: String, require: true },
  bank: { type: String, require: true },
  transactionType: { type: String, enum: Object.values(TRANSACTION_TYPE), require: true },
  feePaymentMethod: { type: String, enum: Object.values(FEE_PAID_TYPE), require: true },
  amount: { type: Number, require: true },
  fee: { type: Number, require: true },
  content: { type: String, require: true },
  status: { type: String, require: true, enum: Object.values(TRANSACTION_STATUS) },
  signature: { type: String },
  time: { type: Date, default: Date.now(), require: true }
}, { collection: 'Transactions', versionKey: false });

export default mongoose.model('Transaction', TransactionSchema);
