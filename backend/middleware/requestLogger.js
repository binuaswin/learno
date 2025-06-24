//backend/middleware/requestLogger.js
const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url} at ${new Date().toISOString()}`);
  if (!res || typeof res.status !== 'function') {
    logger.error('Invalid res object in request middleware');
    return;
  }
  next();
};

module.exports = requestLogger;