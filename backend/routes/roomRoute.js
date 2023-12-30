const express = require('express')
const router = express.Router()


const RoomController = require('../controllers/roomController')
const UserMiddleware = require('../middlewares/authMiddleware')

router.post('/add', UserMiddleware, RoomController.addRoom)
router.post('/suggestions', RoomController.suggestions)

module.exports = router