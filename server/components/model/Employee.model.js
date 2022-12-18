import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  role: { type: String, require: true },
  accountNumber: { type: String, require: true },
  fullName: { type: String, require: true },
  gender: { type: String, require: true },
  phone: { type: String, require: true },
  identityCard: { type: String, require: true },
  dateOfBirth: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  // currentBalance: { type: Number, default: 0 },
  createDate: { type: Date, default: new Date() },
  lastUpdate: { type: Date, default: null }
}, { collection: 'Employee', versionKey: false });

export default mongoose.model('Employee', EmployeeSchema);
