const mongoose = require("mongoose")
const mongoDb = () => {
    mongoose.connect("")
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err =>{
        console.log(err)
    })
}

module.exports = mongoDb