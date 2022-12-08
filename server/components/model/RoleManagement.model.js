import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  role: { type: String, require: true }
}, { collection: 'Role', versionKey: false });

export default mongoose.model('Role', RoleSchema);
