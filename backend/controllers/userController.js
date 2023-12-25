const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) =>{
    const {password,email,name} = req.body
    const checkUser = await User.findOne({email})
    if(checkUser) return res.status(404).send({message: "user already exists"});
    bcrypt.hash(req.body.password,10,function(err, hashedPass){
        if(err) {
            res.json({
                error:err
            })
        }
    })
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
    })
    user.save()
    .then(user =>{
        res.json({
            message: "User saved successfully"
        })
    })
    .catch(err =>{
        res.json({
            message: "Error saving user"
        })
    })
}



module.exports = {register}