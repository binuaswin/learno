//backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9\s-]{7,15}$/, 'Please enter a valid phone number'],
  },
  location: { type: String, trim: true },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profileImage: { type: String, default: null },
  preferences: {
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
    timeZone: { type: String, default: 'UTC' },
    notificationSettings: {
      upcomingTasks: { type: Boolean, default: true },
      deadlines: { type: Boolean, default: true },
      reminders: { type: Boolean, default: true },
      method: { type: String, default: 'in-app' },
    },
  },
  learning_progress: [{
    skill_id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['Technical', 'Soft Skills', 'Creative', 'Other'], default: 'Technical' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
  }],
  study_tasks: [{
    _id: { type: String, required: true },
    title: { type: String, required: true },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    subject: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Completed', 'Overdue'], default: 'Pending' },
    timeSpent: { type: Number, default: 0 },
    completion: { type: Number, min: 0, max: 100, default: 0 },
    timeEstimate: { type: Number, default: 0 },
  }],
  reminders: [{
    _id: { type: String, required: true },
    taskId: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, required: true },
    type: { type: String, default: 'custom' },
  }],
  activities: [{
    action: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
  }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshToken: { type: String, default: null },
});

module.exports = mongoose.model('User', UserSchema);