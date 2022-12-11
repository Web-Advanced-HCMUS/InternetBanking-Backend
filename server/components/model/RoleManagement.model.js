import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  _id: { type: String, require: true }
}, { collection: 'Role', versionKey: false, autoCreate: false });

export default mongoose.model('Role', RoleSchema);
