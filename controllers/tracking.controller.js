const Tracking = require('../models/tracking.model');

// Create and Save a new Tracking
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Tracking content can not be empty"
        });
    }

    // Create a Tracking
    const tracking = new Tracking({
        userId: req.body.userId,
        trackingNumber: req.body.trackingNumber,
        productName: req.body.productName,
        productLocation: req.body.productLocation,
        customerName: req.body.customerName,
        customerStatus: req.body.customerStatus,
        status: req.body.status,
        estimatedDeliveryTime: req.body.estimatedDeliveryTime
    });

    // Save Tracking in the database
    tracking.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tracking."
            });
        });
};

// Retrieve and return all trackings from the database.
exports.findAll = (req, res) => {
    Tracking.find()
        .then(trackings => {
            res.send(trackings);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trackings."
            });
        });
};

// Retrieve and return a single tracking from the database.
exports.findOne = (req, res) => {
    Tracking.findById(req.params.trackingId)
        .then(tracking => {
            if(!tracking) {
                return res.status(404).send({
                    message: "Tracking not found with id " + req.params.trackingId
                });            
            }
            res.send(tracking);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Tracking not found with id " + req.params.trackingId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving tracking with id " + req.params.trackingId
            });
        });
};

// Update a tracking identified by the trackingId in the request
exports.update = (req, res) => {
    // Find tracking and update it with the request body
    Tracking.findByIdAndUpdate(req.params.trackingId, {
        userId: req.body.userId,
        trackingNumber: req.body.trackingNumber,
        productName: req.body.productName,
        productLocation: req.body.productLocation,
        customerName: req.body.customerName,
        customerStatus: req.body.customerStatus,
        status: req.body.status,
        estimatedDeliveryTime: req.body.estimatedDeliveryTime
    }, {new: true})
    .then(tracking => {
        if(!tracking) {
            return res.status(404).send({
                message: "Tracking not found with id " + req.params.trackingId
            });
        }
        res.send(tracking);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tracking not found with id " + req.params.trackingId
            });                
        }
        return res.status(500).send({
            message: "Error updating tracking with id " + req.params.trackingId
        });
    });
};
