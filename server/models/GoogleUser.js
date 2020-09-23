const mongoose = require('mongoose');

const GoogleUserSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'BASIC'
    }
});

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);