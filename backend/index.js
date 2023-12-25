const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


app.use('/api/user',UserRoute)