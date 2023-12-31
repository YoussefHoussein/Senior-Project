const express = require('express')
const router = express.Router()

const BookingController = require('../controllers/bookingController')
const UserMiddleware = require('../middlewares/authMiddleware')

router.post('/create', UserMiddleware, BookingController.createBooking)

module.exports = router