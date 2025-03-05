const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Try both cookies and headers for token (flexibility)
  let token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token found in cookies or headers'); // Debugging (remove in production)
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debugging (remove in production)
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification error:', error.message); // Debugging (remove in production)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', error: 'TokenExpired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.log('No user or role in request'); // Debugging (remove in production)
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      console.log('Forbidden: Role mismatch for', req.user.role, 'required:', roles); // Debugging (remove in production)
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };