const mongoose = require('mongoose');

const TournoiSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 1
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalPlayed: {
        type: Number,
        required: true,
        default: 0
    },
    participants: [{
        id: Number,
        image: String,
        stats: {
            winCount: {
                type: Number,
                default: 0
            },
            finalCount: {
                type: Number,
                default: 0
            },
            semiCount: {
                type: Number,
                default: 0
            },
            quarterCount: {
                type: Number,
                default: 0
            },
        }
    }]
});

module.exports = mongoose.model('Tournoi', TournoiSchema);