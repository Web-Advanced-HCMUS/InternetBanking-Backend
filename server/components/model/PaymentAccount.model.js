import mongoose from 'mongoose';

const PaymentAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  openedDate: { type: Date, default: new Date() },
  currentBalance: { type: Number, default: 0 },
  accountType: { type: String, require: true }
}, { collection: 'PaymentAccount', versionKey: false });

export default mongoose.model('PaymentAccount', PaymentAccountSchema);
