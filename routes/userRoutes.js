const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/users/:userId', (req, res) => {
  User.findOne({ firebaseUid: req.params.userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching user data' });
    });
});

router.put('/users/:userId', (req, res) => {
  User.updateOne({ firebaseUid: req.params.userId }, req.body)
    .then(() => {
      res.json({ message: 'User updated successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating user data' });
    });
});

router.get('/admin/users', adminMiddleware, (req, res) => {
    // Logic to fetch all users
});

module.exports = router;
