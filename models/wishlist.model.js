const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User model
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  // Array of references to Product model
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
