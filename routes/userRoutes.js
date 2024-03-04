// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/userHandler');
const { authenticateToken, authorizeUser } = require('../middleware/authMiddleware');

// Registrer en ny bruker
router.post('/register', async (req, res) => {
  try {
    const user = await userHandler.createUser(req.body.email, req.body.password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logg inn
router.post('/login', userHandler.loginUser);

// Endre passord
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await userHandler.updateUser(req.user.email, req.body.newPassword);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Slett bruker
router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    await userHandler.deleteUser(req.user.email);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hemmelig rute
router.get('/secret', authenticateToken, authorizeUser, (req, res) => {
  res.status(200).json({ secret: 'Her er den hemmelige siden!' });
});

module.exports = router;
