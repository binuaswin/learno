//backend/models/taskModel.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  skillName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    enum: ['Technical', 'Creative', 'Soft Skills', ''],
    default: 'Technical',
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  targetLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', ''],
    default: 'Beginner',
  },
  deadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Skill', skillSchema);