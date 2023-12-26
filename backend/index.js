const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const  UserRoute = require('./routes/userRoute')

mongoose.connect('mongodb://127.0.0.1:27017/senior_project_db');
const db = mongoose.connection;

db.on('error', err => console.error(err));

db.once('open', () => {
    console.log('Database connection established');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.listen(8000, (err) => {
    if (err) {
      throw err
    }
   
  
  
    console.log("server is running on port: ", 8000)
  })

app.use(cors());
app.use('/api/user',UserRoute)
