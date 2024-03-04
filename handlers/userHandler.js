// handlers/userHandler.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (email, password) => {
  try {
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    user.password = newPassword;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (email) => {
  try {
    await User.findOneAndDelete({ email });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Bruker finnes ikke' });
      }
  
      const isMatch = await user.checkPassword(req.body.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Ugyldig passord' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { createUser, getUserByEmail, updateUser, deleteUser, loginUser };
