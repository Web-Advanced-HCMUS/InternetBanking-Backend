import mongoose from 'mongoose';
import {BANK_CODE, TRANSFER_TYPE} from '../../utils/constant.js';

const BeneficiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  reminiscentName: { type: String, require: true },
  accountNumber: { type: String, require: true },
  type: { type: String, enum: Object.values(TRANSFER_TYPE), require: true },
  bankCode: { type: String, default: BANK_CODE.MY_BANK }
}, { collection: 'Beneficiaries', versionKey: false });

export default mongoose.model('Beneficiary', BeneficiarySchema);
