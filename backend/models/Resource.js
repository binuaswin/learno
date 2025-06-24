//backend/models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Article', 'Course', 'Video'], required: true },
});

module.exports = mongoose.model('Resource', resourceSchema);