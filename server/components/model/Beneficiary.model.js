import mongoose from 'mongoose';

const BeneficiarySchema = new mongoose.Schema({
  username: { type: String },
  remindedName: { type: String },
  accountNumber: { type: String }
}, { collection: 'Beneficiaries', versionKey: false });

export default mongoose.model('Beneficiary', BeneficiarySchema);
