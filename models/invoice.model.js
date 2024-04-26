const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  url: String,
  productName: String,
  price: Number,
  weight: Number,
  weightUnit: String,
  quantity: Number
});

const invoiceSchema = new mongoose.Schema({
  products: [productSchema],
  subtotal: Number,
  precioPorPeso: Number,
  precioTotal: Number,
  reference: String,
  userId: String,  // Add this line
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
