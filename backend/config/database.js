const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    logger.info('✅ MongoDB Connected');
  } catch (error) {
    logger.error('❌ MongoDB Connection Error:', { error: error.message });
    setTimeout(() => connectDB(mongoUri), 5000);
  }
};

module.exports = connectDB;