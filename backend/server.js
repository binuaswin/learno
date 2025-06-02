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
    req.body = {};
  }
  logger.debug(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
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
      logger.info(`[${new Date().toISOString()}] ✅ Route /api/${name} attached successfully`);
    } else {
      throw new Error(`Invalid router for /api/${name}`);
    }
  } catch (error) {
    logger.error(`[${new Date().toISOString()}] ❌ Failed to attach route /api/${name}:`, { error: error.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  if (!res || typeof res.status !== 'function') {
    logger.error(`[${new Date().toISOString()}] Invalid res object:`, { res });
    return next();
  }

  logger.error(`[${new Date().toISOString()}] Server error:`, { error: err.message, stack: err.stack });

  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong!'
    : err.message;

  res.status(err.status || 500).json({
    message,
    timestamp: new Date().toISOString(),
  });
});

// MongoDB Connection with retry
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/db';
const connectWithRetry = () => {
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  })
    .then(() => {
      logger.info(`[${new Date().toISOString()}] ✅ MongoDB Connected`);
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        logger.info(`[${new Date().toISOString()}] 🚀 Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      logger.error(`[${new Date().toISOString()}] ❌ MongoDB Connection Error:`, {
        error: error.message,
        code: error.code,
        uri: mongoUri,
      });
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();