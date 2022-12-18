import mongoose from 'mongoose';

const BeneficiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  remindedName: { type: String, require: true },
  accountNumber: { type: String, require: true },
  type: { type: String, require: true },
  interBank: { type: mongoose.Types.ObjectId, ref: 'InterBank', require: true }
}, { collection: 'Beneficiaries', versionKey: false });

export default mongoose.model('Beneficiary', BeneficiarySchema);
