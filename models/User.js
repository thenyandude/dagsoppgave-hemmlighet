// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.checkPassword = async function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
