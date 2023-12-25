const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: "Custom: Email is required"
    },
    password: String,
    name: String,
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    },
    userType: {
      id: {
        type: Number,
        enum: [1, 2] 
      },
      role: {
        type: String,
        enum: ['admin', 'client']
      }
    }
  });

const model = mongoose.model("User", userSchema)
module.exports = model;