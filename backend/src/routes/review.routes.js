const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller')

router.post('/create', reviewController.createReview)
router.post('/delete', reviewController.deleteReview)
router.post('/list', reviewController.listReview)

module.exports = router