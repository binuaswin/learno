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
    learningGoal: { type: String, default: '' },
  },
  learning_progress: [{
    skill_id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 100 },
    category: { type: String, enum: ['Technical', 'Soft Skills', 'Creative', 'Other'], default: 'Technical' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    createdAt: { type: Date, default: Date.now },
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
  recentActivities: [{
    id: { type: String, required: true },
    icon: { type: String, default: '📌' },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
  adaptive_learning: {
    activeModules: [{ type: String }],
    recommendations: [{
      moduleTitle: { type: String, required: true },
      difficulty: { type: String, required: true },
    }],
    timeSpent: [{
      task: { type: String, required: true },
      hours: { type: Number, min: 0, required: true },
    }],
    quizzes: [{
      title: { type: String, required: true },
      score: { type: Number, min: 0, max: 100, required: true },
      date: { type: Date, default: Date.now },
    }],
    exercises: [{
      title: { type: String, required: true },
      result: { type: String, enum: ['Correct', 'Incorrect', 'Pending'], required: true },
      date: { type: Date, default: Date.now },
    }],
    goals: [{
      skill: { type: String, required: true },
      target: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
      progress: { type: Number, min: 0, max: 100, default: 0 },
    }],
    streak: { type: Number, default: 0 },
    learningMode: {
      pace: { type: String, enum: ['Slow', 'Moderate', 'Fast'], default: 'Moderate' },
      contentFormat: { type: String, enum: ['Videos', 'Articles', 'Interactive'], default: 'Videos' },
      learningStyle: { type: String, enum: ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'], default: 'Visual' },
    },
    milestones: [{
      title: { type: String, required: true },
      achieved: { type: Boolean, default: false },
    }],
    reflection: [{
      module: { type: String, required: true },
      note: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }],
    feedback: [{
      module: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
    }],
    reminders: [{
      task: { type: String, required: true },
      dueDate: { type: String, required: true },
      time: { type: String, required: true },
    }],
    alerts: [{
      message: { type: String, required: true },
    }],
    completedModules: { type: Number, default: 0 },
    totalModules: { type: Number, default: 0 },
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshToken: { type: String, default: null },
  skills: [{ type: String }], // Added for QuickStats.jsx
  goals: [{ type: String }], // Added for QuickStats.jsx
});

// Add unique index on skill_id within learning_progress
UserSchema.index({ 'learning_progress.skill_id': 1 }, { unique: true });
// Add index on study_tasks._id
UserSchema.index({ 'study_tasks._id': 1 });
// Add index on reminders._id
UserSchema.index({ 'reminders._id': 1 });

module.exports = mongoose.model('User', UserSchema);