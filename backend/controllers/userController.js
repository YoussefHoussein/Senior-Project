const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const { response } = require('express');
const jwt = require("jsonwebtoken");

const register = async (req, res, next) =>{
    const {password,email,name} = req.body
    const checkUser = await User.findOne({email})
    if(checkUser) return res.json({message: "user already exists"});
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        latitude:0,
        langitude:0,
        userType: 2,
    })
    await user.save()
    .then(user =>{
        res.json({
            message: "User saved successfully",
            user: user
        })
    })
    .catch(err =>{
        res.json({
            message: "Error saving user"
        })
    })
}
const login = async (req, res,next) =>{
    const {email: login, password} = req.body;
    const user = await User.findOne({email: login})
    if(!user) return res.json({message: "email/password incorrect"});
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.json({message: "email/password incorrect"});
    const {password: hashedPassword, _id, ...userInfo} = user.toJSON();
    let token = jwt.sign({_id}, 'AsQ132PI',{expiresIn: '1h'})
    res.send({
        message: "Logged in successfully",
        token,
        user: userInfo
    })
}

const upadate = async (req, res) => {
    const {e_name, e_email, latitude, longitude,country, token} = req.body
    try{
        const decoded = jwt.verify(token,'AsQ132PI')
        const userId = decoded._id
        const user = await User.findById(userId)
        if(e_name && e_email){
            user.name = e_name
            user.email = e_email
            user.latitude = latitude
            user.langitude = longitude
            user.country = country
            await user.save()
            res.send({
                message: 'Updated user',
                name: user.name,
                email: user.email,
                latitude: user.latitude,
                longitude: user.langitude,
                country: user.country
            })
        }
        else{
            res.send({
                message: 'Error updating user, missing data',
            })
        }
        
    }
    catch(err){
        res.send({message: 'token invalid', })
    }
    
}

const verify = (req, res, next) =>{
    res.send({
        message : "authorized"
    })
}


module.exports = {register, login, verify, upadate}