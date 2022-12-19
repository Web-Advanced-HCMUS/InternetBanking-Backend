import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'UserInfo', require: true },
  type: { type: String, require: true },
  receiverAccountNumbe: { type: String, require: true },
  receiverName: { type: String, require: true },
  amount: { type: Number, require: true },
  content: { type: String, require: true },
  interBank: { type: mongoose.Types.ObjectId, ref: 'InterBank', require: true },
  newBalance: { type: Number, require: true },
  status: { type: Boolean, require: true },
  createDate: { type: Date, default: new Date() }
}, {});
