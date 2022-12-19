import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  role: { type: String, require: true },
  fullName: { type: String, require: true },
  gender: { type: String, require: true },
  phone: { type: String, require: true },
  identityCard: { type: String, require: true },
  dateOfBirth: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  createDate: { type: Date, default: new Date() },
  lastUpdate: { type: Date, default: new Date() }
}, { collection: 'Employees', versionKey: false });

export default mongoose.model('Employee', EmployeeSchema);
