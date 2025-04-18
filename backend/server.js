const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const skillRoutes = require('./routes/skillRoutes');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./logger');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();

// Create uploads directory
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use('/Uploads', express.static(uploadDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error('Server error:', { error: err.message, stack: err.stack });
  const message = process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message;
  res.status(500).json({ message });
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/learno_db';
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
    logger.error('❌ MongoDB Connection Error:', { error: error.message });
    process.exit(1);
  });