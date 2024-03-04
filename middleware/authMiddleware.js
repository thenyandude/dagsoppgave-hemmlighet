const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.userId);
    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
  } catch (err) {
    // Handle different errors appropriately
    if (err.name === 'JsonWebTokenError') {
      return res.sendStatus(403); // Invalid token
    }
    return res.status(500).json({ message: 'Error in token verification' });
  }
};

const authorizeUser = (req, res, next) => {
  // Sjekk om innlogget bruker er admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Tilgang nektet: Krever admin-tilgang." });
  }

  next();
};

module.exports = { authenticateToken, authorizeUser };
