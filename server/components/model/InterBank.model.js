import mongoose from 'mongoose';

const InterBankSchema = new mongoose.Schema({
  bankName: { type: String, require: true },
  secretKey: { type: String, require: true },
  queryAPI: { type: Object, require: true },
  transfertAPI: { type: Object, rqeuire: true }
}, { collection: 'InterBank', versionKey: false });

export default mongoose.model('InterBank', InterBankSchema);
