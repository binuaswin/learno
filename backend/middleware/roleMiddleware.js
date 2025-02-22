// roleMiddleware.js
module.exports = (allowedRoles) => {
    return (req, res, next) => {
      // req.user is set by the authentication middleware (from the access token)
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      next();
    };
  };
  