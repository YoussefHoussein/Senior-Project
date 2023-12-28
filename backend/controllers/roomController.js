const Room = require('../models/roomModel').Room
const jwt = require("jsonwebtoken");
const addRoom = async (req, res, next) =>{
    const {features, latitude, longitude, images} = req.body;
    try{
        if(!features || !latitude || !longitude || images.length == 0){
            res.json({
                message: "missing data"
            })
            return
        }
        const existingRoom = await Room.findOne({ latitude, longitude });

        if (existingRoom) {
            res.json({
                message: "room already exists"
            })
            return
        }
        const newRoom = new Room({
            features,
            latitude,
            longitude,
            images
          });
      
        const savedRoom = await newRoom.save();
        res.json({
            message: "room saved successfully",
            room: savedRoom,
        })
        return
    }
    catch(err){
        res.json({
            message: "Error saving room",
            error: err
        })
    }
}
module.exports = {addRoom}