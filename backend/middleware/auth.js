const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Prioritize Authorization header, fallback to cookies
  let token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;

  console.log('Token received:', token); // Debug

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user:', decoded); // Debug
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', error: 'TokenExpired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No user role found' });
    }
    if (roles.length > 0 && !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };