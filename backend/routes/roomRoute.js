const express = require('express')
const router = express.Router()


const RoomController = require('../controllers/roomController')
const UserMiddleware = require('../middlewares/authMiddleware')

router.post('/add', UserMiddleware, RoomController.addRoom)

module.exports = router