const logger = require('../utils/logger');

const errorHandler = (err, req, res) => {
  if (!res || typeof res.status !== 'function') {
    logger.error('Invalid res object in error handler');
    return;
  }

  logger.error('Server error:', { error: err.message, stack: err.stack });

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message;

  res.status(statusCode).json({
    message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;