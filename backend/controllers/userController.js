const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) =>{
    const {password,email,name} = req.body
    const checkUser = await User.findOne({email})
    if(checkUser) return res.json({message: "user already exists"});
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password = "+hashedPassword);
    console.log("password = "+password);
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
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
    const {password: hashedPassword, name, email, _id, ...userInfo} = user.toJSON();
    let token = jwt.sign({_id}, 'AsQ132PI',{expiresIn: '1h'})
    res.send({
        message: "Logged in successfully",
        token,
        user: userInfo
    })
}


module.exports = {register, login}