const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
        type:String,
        unique: true,
    },
    email :{
        type:String,
        unique: true,
    },
    password :{
        type:String,
        unique: true,
    },
    langitude :{
        type: Number,
        default: null
    },
    latitude :{
        type: Number,
        default: null 
    },
    userType :{
        type: Number
    },
    country :{
        type: String,
        default: null
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;