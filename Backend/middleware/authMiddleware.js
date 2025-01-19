const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and attach the user data to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assuming the token contains userId
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
