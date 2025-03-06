// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/authRoutes');
const logger = require('./logger');

dotenv.config();
const app = express();

// Log environment variables for debugging
logger.info('Environment variables:', {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB Connection with learno_db
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/learno_db';
logger.info('Using MongoDB URI:', mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => {
    logger.info('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  });