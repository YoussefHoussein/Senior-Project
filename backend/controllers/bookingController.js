const Booking = require('../models/bookingModel')
const jwt = require("jsonwebtoken");

const createBooking = async (req,res,next) =>{
    const {room_id, token, date, duration} = req.body
    const decoded = jwt.verify(token,'AsQ132PI')
    const user_Id = decoded._id
    
    try{
        const endDate = new Date(new Date(date).getTime() + duration * 60 * 60 * 1000);

        const existingBookings = await Booking.find({
            room: room_id,
            $or: [
                {
                    date: { $lt: new Date(date) }, 
                    endDate: { $gt: new Date(date) }, 
                },
                {
                    date: { $lt: endDate }, 
                    endDate: { $gt: endDate }, 
                },
                {
                    date: { $gte: new Date(date) }, 
                    endDate: { $lte: endDate }, 
                },
            ],
        });
        const existingUserBookings = await Booking.find({
            room: user_Id,
            $or: [
                {
                    date: { $lt: new Date(date) }, 
                    endDate: { $gt: new Date(date) }, 
                },
                {
                    date: { $lt: endDate }, 
                    endDate: { $gt: endDate }, 
                },
                {
                    date: { $gte: new Date(date) }, 
                    endDate: { $lte: endDate }, 
                },
            ],
        });
        if (existingBookings.length > 0) {
            res.json({
                message:'room already booked in this time'
            })
            return 
        }
        if (existingUserBookings.length > 0) {
            res.json({
                message:'you have already room in this time'
            })
            return 
        }
        const newBooking = new Booking({
            room: room_id,
            user: user_Id,
            date: new Date(date),
            duration: duration
        });
    
        await newBooking.save()

        res.json({
            message: "booking saved successfully",
            room: newBooking,
        })
        return
    }
    catch(err){
        console.error('Error saving the booking:', err);
        res.status(500).json({
            message: 'Error saving booking',
            error: err,
        });
    }
}

module.exports = {createBooking}