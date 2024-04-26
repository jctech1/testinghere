const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User model
  trackingNumber: String,
  productName: String,
  productLocation: String,
  customerName: String,
  customerStatus: String, // "regular" or "star"
  status: String, // e.g. "In Transit", "Delivered"
  estimatedDeliveryTime: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Tracking = mongoose.model('Tracking', TrackingSchema);

module.exports = Tracking;
