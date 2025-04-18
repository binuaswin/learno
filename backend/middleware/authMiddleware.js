const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const logger = require('../logger');

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check cookies or Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.warn('No token provided in request');
    res.status(401);
    throw new Error('Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info('Token decoded successfully', { userId: decoded.id });

    // Fetch user from database
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      logger.warn('User not found for token', { userId: decoded.id });
      res.status(401);
      throw new Error('Unauthorized: User not found');
    }

    next();
  } catch (error) {
    logger.error('Token verification failed', { error: error.message });
    if (error.name === 'TokenExpiredError') {
      res.status(401);
      throw new Error('Unauthorized: Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401);
      throw new Error('Unauthorized: Invalid token');
    }
    res.status(401);
    throw new Error('Unauthorized: Token verification failed');
  }
});

const verifyRole = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.role) {
    logger.warn('No user or role in request');
    res.status(401);
    throw new Error('Unauthorized: No user or role');
  }

  const roles = req.route?.roles || [];
  if (roles.length && !roles.includes(req.user.role)) {
    logger.warn('Forbidden: Role mismatch', { userRole: req.user.role, requiredRoles: roles });
    res.status(403);
    throw new Error('Forbidden: Insufficient role');
  }
  next();
});

module.exports = { verifyToken, verifyRole };