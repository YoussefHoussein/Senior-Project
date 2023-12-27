const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const UserMiddleware = require('../middlewares/authMiddleware')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/update', UserController.upadate)
router.get('/verify',UserMiddleware, UserController.verify)

module.exports= router