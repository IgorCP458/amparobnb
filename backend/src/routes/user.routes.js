const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')

router.post('/signup', UserController.createUser)
router.post('/signin', UserController.login)
router.post('/delete', UserController.deleteUser)
router.post('/list', UserController.userList)

module.exports = router