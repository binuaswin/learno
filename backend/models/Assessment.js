//backend/models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  skill: { type: String, required: true },
});

module.exports = mongoose.model('Assessment', assessmentSchema);