import mongoose from 'mongoose';

import { DEBT_STATUS, DEBT_TYPE } from '../../utils/constant.js';

const DebtSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  otherUserId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  amountOwed: { type: Number, require: true },
  debtType: { type: String, enum: Object.values(DEBT_TYPE), require: true },
  status: { type: String, enum: Object.values(DEBT_STATUS), default: DEBT_STATUS.unpaid, require: true },
  startDate: { type: Date, default: new Date(), require: true },
  endDate: { type: Date, require: true }
}, { collection: 'Debts', versionKey: false });

export default mongoose.model('Debt', DebtSchema);
