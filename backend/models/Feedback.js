//backend/models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reflection: { type: String, required: true },
  peerFeedback: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = mongoose.model('Feedback', feedbackSchema);