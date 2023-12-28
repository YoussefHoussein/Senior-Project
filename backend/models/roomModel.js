const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    features:{
        type: String,
    },
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    },
    images: [imagesSchema] 
})

const imagesSchema = new Schema({
    image:{
        type: String,
    }
})

const Room = mongoose.model('Room', roomSchema);
const Image = mongoose.model('Image', imagesSchema);

module.exports = {
  Room,
  Image
};