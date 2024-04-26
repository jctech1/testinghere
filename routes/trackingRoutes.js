const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.controller');

// Create a new Tracking
router.post('/', trackingController.create);

// Retrieve all Trackings
router.get('/', trackingController.findAll);

// Retrieve a single Tracking with trackingId
router.get('/:trackingId', trackingController.findOne);

// Update a Tracking with trackingId
router.put('/:trackingId', trackingController.update);

// Delete a Tracking with trackingId
// router.delete('/:trackingId', trackingController.delete); // if you want to include a delete function

module.exports = router;
