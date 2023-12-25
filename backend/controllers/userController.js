const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const index = (req, res, next) => {
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(err =>{
        res.json({
            message: "An error occurred"
        })
    })
}
module.exports = {index}