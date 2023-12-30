const Room = require('../models/roomModel').Room
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const  generateRandomPassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    
    return password;
  }

const addRoom = async (req, res, next) =>{
    const passwordLength = 12; 
    const randomPassword = generateRandomPassword(passwordLength);
    
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const roomImagesDir = path.resolve(process.cwd(), 'room_images');
    if (!fs.existsSync(roomImagesDir)) {
        fs.mkdirSync(roomImagesDir);
        console.log('Created "room_images" directory');
    }
    const {description, latitude, longitude, base64Images, userType} = req.body;
    if(userType === 2){
        res.json({
            message: "You can not handle this process"
        });
        return;
    }
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

        const roomFolder = path.join(roomImagesDir, `room_${uuidv4()}`);
        fs.mkdirSync(roomFolder);

        const savedImageObjects = base64Images.map((base64Image, index) => {
            const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64');
            const imageName = `image_${index + 1}.png`;
            const imagePath = path.join(roomFolder, imageName);
        
            fs.writeFileSync(imagePath, imageBuffer);
        
            return { image: imageName, folderName: roomFolder }; 
        });

          const roomData = new Room({
            features: description,
            images: savedImageObjects,
            latitude,
            longitude,
            password: hashedPassword
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
const getRoomImagesAsBase64 = async (room) => {
    const imagePromises = room.images.map(async (image) => {
        if (!image.folderName || !image.image) {
            console.error('Invalid image object:', image);
            return null;
        }

        const imagePath = path.join(image.folderName, image.image);

        console.log('Processing image:', imagePath);

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            return {
                image: base64Image,
            };
        } catch (err) {
            console.error(`Error reading image file ${image.image} in folder ${image.folderName}:`, err);
            return null;
        }
    });

    const images = await Promise.all(imagePromises);
    return images.filter(Boolean); 
};






const suggestions = async (req, res, next) => {
    const { userLat, userLong } = req.body;

    try {
        const rooms = await Room.find({});

        const results = await Promise.all(
            rooms
                .filter(room => Math.abs(room.latitude - userLat) <= 5 && Math.abs(room.longitude - userLong) <= 5)
                .map(async (room) => {
                    const roomWithImages = {
                        ...room.toObject(),
                        images: await getRoomImagesAsBase64(room),
                    };

                    return roomWithImages;
                })
        );

        res.json(results);
        return;
    } catch (err) {
        console.error('Error fetching suggestions:', err);
        res.status(500).json({
            message: 'Error occurred',
            error: err,
        });
    }
};



module.exports = {addRoom, suggestions}