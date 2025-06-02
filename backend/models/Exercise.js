//backend/models/Exercise.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: String, required: true },
  challenge: { type: String, required: true },
  status: { type: String, enum: ['incomplete', 'completed', 'passed'], default: 'incomplete' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
});

module.exports = mongoose.model('Exercise', exerciseSchema);