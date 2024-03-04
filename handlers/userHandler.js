// handlers/userHandler.js

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

module.exports = { createUser, getUserByEmail, updateUser, deleteUser };
