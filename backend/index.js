const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const  UserRoute = require('./routes/userRoute')
const RoomRoute =require('./routes/roomRoute')


mongoose.connect('mongodb://127.0.0.1:27017/senior_project_db');
const db = mongoose.connection;

db.on('error', err => console.error(err));

db.once('open', () => {
  console.log('Database connection established');
});

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const roomImagesDir = path.resolve(process.cwd(), 'room_images');
if (!fs.existsSync(roomImagesDir)) {
    fs.mkdirSync(roomImagesDir);
    console.log('Created "room_images" directory');
}

app.use('/api/user',UserRoute)
app.use('/api/rooms',RoomRoute)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(8000, (err) => {
    if (err) {
      throw err
    }
   
  
  
    console.log("server is running on port: ", 8000)
  })