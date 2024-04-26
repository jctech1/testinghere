const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice.model');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', (req, res) => {
  Invoice.find({})
    .then((invoices) => {
      res.status(200).json(invoices);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve invoices' });
    });
});

router.post('/:userId', (req, res) => {
  const {
    products,
    subtotal,
    precioPorPeso,
    precioTotal,
    reference
  } = req.body;
  const userId = req.params.userId;

  const newInvoice = new Invoice({
    products,
    subtotal,
    precioPorPeso,
    precioTotal,
    reference,
    userId
  });

  newInvoice.save()
    .then(() => {
      res.status(201).json({ message: 'Invoice saved successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save invoice' });
    });
});

router.post('/admin/invoices/:invoiceId/approve', adminMiddleware, (req, res) => {
    const invoiceId = req.params.invoiceId;
    // Logic to approve the invoice and potentially convert it to an order
});

module.exports = router;
