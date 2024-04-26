require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const orderRoutes = require('./routes/orderRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const firebaseAuthMiddleware = require('./middlewares/firebaseAuthMiddleware');
const adminMiddleware = require('./middlewares/adminMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB database!');

  // Use CORS middleware
  app.use(cors());

  // Parse incoming requests with JSON payloads
  app.use(express.json());

  // Use your API routes
  app.use('/api/users', userRoutes);
  app.use('/api/accounts', accountRoutes);

  // Create an adminRouter to handle all admin-related routes
  const adminRoutes = express.Router();

  // Apply both middlewares to all admin routes
  adminRoutes.use(firebaseAuthMiddleware, adminMiddleware);

  // Nest your admin-related routes under this router
  adminRoutes.use('/invoices', invoiceRoutes);
  // Add other admin routes as necessary, e.g.:
  // adminRoutes.use('/orders', orderRoutes);
  // ... and so on

  // Attach the admin routes to your main app
  app.use('/api/admin', adminRoutes);

  app.use('/api/orders', orderRoutes);
  app.use('/api/trackings', trackingRoutes);
  app.use('/api/wishlists', wishlistRoutes);

  // Set up express to serve your Angular application
  app.use(express.static(path.join(__dirname, '/dist/site-box')));

  // This should be the last route else any after this won't work
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/site-box/index.html'));
  });

  // Start server once MongoDB connection is established
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
