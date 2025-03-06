const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
  level: 'info', // Log info and above (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to file
    new winston.transports.File({ filename: 'combined.log' }), // Log all to file
    new winston.transports.Console({ format: winston.format.simple() }) // Log to console for development
  ],
});

module.exports = logger;