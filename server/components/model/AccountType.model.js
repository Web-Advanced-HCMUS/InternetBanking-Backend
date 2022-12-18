import mongoose from 'mongoose';

const AccountTypeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  desc: { type: String, require: true }
}, { collection: 'AccountType', versionKey: false });

export default mongoose.model('AccountType', AccountTypeSchema);
