const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/:userId', (req, res) => {
  Order.find({ userId: req.params.userId })
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching orders' });
    });
});

router.post('/orders/:userId', (req, res) => {
  const order = new Order({ ...req.body, userId: req.params.userId });
  order.save()
    .then(() => {
      res.json({ message: 'Order created successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error creating order' });
    });
});

router.get('/admin/orders', adminMiddleware, (req, res) => {
    // Logic to fetch all orders
});

router.put('/admin/orders/:orderId', adminMiddleware, (req, res) => {
    const orderId = req.params.orderId;
    const newStatus = req.body.status; 
    // Logic to update the order's status
});

module.exports = router;
