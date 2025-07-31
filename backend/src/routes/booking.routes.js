const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/booking.controller')

router.post('/create', bookingController.createBooking)
router.post('/delete', bookingController.deleteBooking)
router.post('/list', bookingController.listBooking)
router.post('/update', bookingController.updateBooking)

module.exports = router