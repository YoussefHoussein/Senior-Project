const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoDb = require("./configs/mongodb.connection")
const bodyParser =require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
const passportSetup = require("./passport")
const authRoute = require("./routes/auth")
app.use(bodyParser.json({limit: '10mb'}))

app.use(express.json)
app.use(
    cookieSession({
        name:"session",
        keys:["cyberwolve"],
        maxAge: 24*60*60*100,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}))
app.use("/auth",authRoute)
app.listen(8000, (err)=>{
    if(err){
        throw err
    }
    mongoDb()

    console.log("server is running on port: ", 8000)
})