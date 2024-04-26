const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  url: String,
  name: String,
  price: Number,
  weight: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
