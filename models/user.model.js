const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: String,
  email: String,
  displayName: String,
  photoURL: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
