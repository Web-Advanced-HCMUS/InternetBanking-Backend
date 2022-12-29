import mongoose from 'mongoose';
import { TRANSFER_TYPE } from '../../utils/constant.js';

const BeneficiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  reminiscentName: { type: String, require: true },
  accountNumber: { type: String, require: true },
  type: { type: String, enum: Object.values(TRANSFER_TYPE), require: true },
  interBank: { type: mongoose.Types.ObjectId, ref: 'InterBank' }
}, { collection: 'Beneficiaries', versionKey: false });

export default mongoose.model('Beneficiary', BeneficiarySchema);
