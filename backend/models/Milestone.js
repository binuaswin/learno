//backend/models/MileStone.js
const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Milestone', milestoneSchema);