import mongoose from 'mongoose';

import { DEBT_STATUS } from '../../utils/constant.js';

const DebtSchema = new mongoose.Schema({
  creditorAccountNumber: { type: String, require: true },
  debtorAccountNumber: { type: String, require: true },
  amountOwed: { type: Number, require: true },
  content: { type: String, require: true },
  status: { type: String, enum: Object.values(DEBT_STATUS), default: DEBT_STATUS.INCOMPLETE, require: true },
  startDate: { type: Date, default: new Date(), require: true },
  endDate: { type: Date, require: true }
}, { collection: 'Debts', versionKey: false });

export default mongoose.model('Debt', DebtSchema);
