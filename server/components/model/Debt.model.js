import mongoose from 'mongoose';

import { DEBT_STATUS } from '../../utils/constant.js';

const DebtSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  debtorId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  amountOwed: { type: Number, require: true },
  debtType: { type: String, require: true },
  status: { type: String, default: DEBT_STATUS.unpaid },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, require: true }
}, { collection: 'Debt', versionKey: false });

export default mongoose.model('Debt', DebtSchema);
