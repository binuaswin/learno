const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  preferences: {
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
  },
  learning_progress: [{
    module_id: { type: String },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'] },
  }],
  study_tasks: [{
    task_id: { type: String },
    title: { type: String },
    status: { type: String, enum: ['Pending', 'Completed'] },
  }],
  activities: [{ // Activities field already exists
    action: { type: String },
    timestamp: { type: Number, default: Date.now },
  }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
  refreshToken: { type: String, default: null }, // Add refresh token field
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);