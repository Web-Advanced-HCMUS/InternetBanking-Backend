import mongoose from 'mongoose';

const TransactionTypeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  desc: { type: String, require: true }
}, { collection: 'TransactionType', versionKey: false });

export default mongoose.model('TransactionType', TransactionTypeSchema);
