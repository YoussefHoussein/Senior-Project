const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {
        type: String,
    }
});

const roomSchema = new Schema({
    features: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    images: [imageSchema]
});

const Room = mongoose.model('Room', roomSchema);
const Image = mongoose.model('Image', imageSchema);

module.exports = {
    Room,
    Image
};