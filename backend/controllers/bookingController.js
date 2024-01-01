const Booking = require('../models/bookingModel')
const jwt = require("jsonwebtoken");

const createBooking = async (req,res,next) =>{
    const {room_id, token, date, duration} = req.body
    const decoded = jwt.verify(token,'AsQ132PI')
    const user_Id = decoded._id
    
    try{
        const startDate = new Date(date)
        const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);
        
        const overlappingBookings = await Booking.find({
            room: room_id,
            $or: [
                {
                    date: { $lte: endDate },
                    endDate: { $gte: startDate },
                },
            ],
        });
        const overlappingUserBookings = await Booking.find({
            user: user_Id,
            $or: [
                {
                    date: { $lte: endDate },
                    endDate: { $gte: startDate },
                },
            ],
        });
        if (overlappingBookings.length > 0) {
            res.json({
                message: 'Room already booked in this time',
            });
            return;
        }
        if (overlappingUserBookings.length > 0) {
            res.json({
                message: 'You have already booking in this time',
            });
            return;
        }
        
        const newBooking = new Booking({
            room: room_id,
            user: user_Id,
            date: new Date(date),
            endDate: endDate,
        });
    
        await newBooking.save()

        res.json({
            message: "Booking saved successfully",
            room: {
                room: newBooking.room,
                user: newBooking.user,
                date: newBooking.date.toLocaleString(),
                endDate: newBooking.endDate.toLocaleString(),
            },
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