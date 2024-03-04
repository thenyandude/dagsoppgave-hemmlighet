const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Splitter "Bearer <token>" og henter <token>
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    const user = await User.findById(decoded.userId);
    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
  });
};

const authorizeUser = (req, res, next) => {
    // Sjekk om innlogget bruker er admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Tilgang nektet: Krever admin-tilgang." });
    }
  
    next();
  };
  

module.exports = { authenticateToken, authorizeUser };
