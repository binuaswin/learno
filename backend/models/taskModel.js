//backend/models/taskModels.js
const mongoose = require('mongoose');

// Define Task Schema
const taskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  priority: { 
    type: String, 
    required: true, 
    enum: ['Low', 'Medium', 'High'] 
  },
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Completed', 'Overdue'] 
  },
});

// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);
