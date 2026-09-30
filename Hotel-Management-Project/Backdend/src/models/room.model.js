const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber:
    {
        type: String,
        required: true
    },
    roomType:
    {
        type: String,
        required: true
    },
    pricePerNight:
    {
        type: Number,
        required: true
    },
    capacity:
    {
        type: Number,
        required: true
    },
    floor:
    {
        type: Number,
        required: true
    },
    amenities:
    {
        type: Array,
        default: []
    },
    isAvailable:
    {
        type: Boolean,
        default: true
    },
    description:
        { type: String }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Room', roomSchema);