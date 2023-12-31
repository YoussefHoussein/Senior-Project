const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Room = require('./roomModel');

const bookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
