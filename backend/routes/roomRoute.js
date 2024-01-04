const express = require('express')
const router = express.Router()


const RoomController = require('../controllers/roomController')
const UserMiddleware = require('../middlewares/authMiddleware')

router.post('/add', UserMiddleware, RoomController.addRoom)
router.post('/suggestions',UserMiddleware, RoomController.suggestions)
router.post('/delete',UserMiddleware, RoomController.deleteRoom)

module.exports = router