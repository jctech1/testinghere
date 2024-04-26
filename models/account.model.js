const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, // This should store the URL of the profile picture
    },
    idDocument: {
        front: { type: String }, // This should store the URL of the front side of the ID document
        back: { type: String },  // This should store the URL of the back side of the ID document
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
