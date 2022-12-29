import mongoose from 'mongoose';

const InterBankSchema = new mongoose.Schema({
  name: { type: String, require: true },
  code: { type: String, require: true },
  secretKey: { type: String, require: true },
  publicKey: { type: String, require: true },
  queryAPI: { type: String, require: true },
  transferAPI: { type: String, require: true }
}, { collection: 'Interbank', versionKey: false });

export default mongoose.model('Interbank', InterBankSchema);
