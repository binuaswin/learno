//backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

dotenv.config();
const app = express();

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware setup
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.is('json')) {
    req.body = {}; // Ensure no body parsing for GET
  }
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Uploads directory setup
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/Uploads', express.static(uploadDir));

// Import routes
const routes = {
  auth: require('./routes/authRoutes'),
  profile: require('./routes/profileRoutes'),
  skills: require('./routes/skillRoutes'),
  tasks: require('./routes/taskRoutes'),
};

// Attach routes
Object.entries(routes).forEach(([name, router]) => {
  try {
    if (router && typeof router === 'function' && router.stack) {
      app.use(`/api/${name}`, router);
      logger.info(`✅ Route /api/${name} attached successfully`);
    } else {
      throw new Error(`Invalid router for /api/${name}`);
    }
  } catch (error) {
    logger.error(`❌ Failed to attach route /api/${name}:`, { error: error.message });
  }
});

// ✅ Global error handler (moved to the end)
app.use((err, req, res) => { // Removed unused `next` parameter
  // Ensure `res` is an Express response object
  if (!res || typeof res.status !== 'function') {
    logger.error('Invalid res object:', { res });
    return; // Exit if res is not valid
  }

  // Log the error
  logger.error('Server error:', { error: err.message, stack: err.stack });

  // Send error response
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong!'
    : err.message;

  res.status(500).json({
    message,
    timestamp: new Date().toISOString(),
  });
});

// MongoDB Connection with retry
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/learno_db';
const connectWithRetry = () => {
  mongoose.connect(mongoUri)
    .then(() => {
      logger.info('✅ MongoDB Connected');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        logger.info(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      logger.error('❌ MongoDB Connection Error:', { error: error.message });
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
