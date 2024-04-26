const Invoice = require('./invoice');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dbSiteBox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database!');
});

// Assuming you have the required data stored in variables
const url = 'https://example.com/product';
const productName = 'Example Product';
const price = 10;
const weight = 0.5;
const subtotal = price * weight;
const precioPorPeso = price / weight;
const precioTotal = subtotal + precioPorPeso;

// Create a new invoice document
const invoice = new Invoice({
  url,
  productName,
  price,
  weight,
  subtotal,
  precioPorPeso,
  precioTotal,
});

// Save the invoice document to the database
invoice.save()
  .then(() => {
    console.log('Invoice saved successfully!');
    // Close the MongoDB connection after saving the invoice
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error saving invoice:', err);
    // Close the MongoDB connection in case of an error
    mongoose.connection.close();
  });
