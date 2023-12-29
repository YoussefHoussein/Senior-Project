const Room = require('../models/roomModel').Room
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const addRoom = async (req, res, next) =>{
    const roomImagesDir = path.resolve(process.cwd(), 'room_images');
    if (!fs.existsSync(roomImagesDir)) {
        fs.mkdirSync(roomImagesDir);
        console.log('Created "room_images" directory');
    }
    const {description, latitude, longitude, base64Images} = req.body;
    try{
        if (latitude === 0 && longitude === 0) {
            res.json({
                message: "missing data - latitude and longitude are both zero"
            });
            return;
        }
        if (latitude == null || isNaN(latitude) || longitude == null || isNaN(longitude)) {
            res.json({
                message: "missing data - latitude and/or longitude are null, undefined, or NaN"
            });
            return;
        }
        if(!description || !base64Images){
            res.json({
                message: "missing data",
                description: description,
                latitude: latitude,
                longitude: longitude,
                base64Images: base64Images
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

        const roomFolder = path.join(roomImagesDir, `room_${Date.now()}`);
        fs.mkdirSync(roomFolder);

        const savedImageObjects = base64Images.map((base64Image, index) => {
            const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64');
            const imageName = `image_${index + 1}.png`;
            const imagePath = path.join(roomFolder, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            return { image: imageName };
        });

          const roomData = new Room({
            features: description,
            images: savedImageObjects,
            latitude,
            longitude,
          })
      
        const savedRoom = await roomData.save();
        res.json({
            message: "room saved successfully",
            room: savedRoom,
        })
        return
    }
    catch (err) {
        console.error('Error saving room:', err);
        res.status(500).json({
            message: 'Error saving room',
            error: err,
        });
}
}


module.exports = {addRoom}