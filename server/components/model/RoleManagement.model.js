import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  _id: { type: String }
}, { collection: 'Role' });

export default mongoose.model('Role', RoleSchema);
