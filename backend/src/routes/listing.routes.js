const express = require('express')
const router = express.Router()
const ListingController = require('../controllers/listing.controller')

router.post("/create", ListingController.createListing)
router.post("/delete", ListingController.deleteListing)
router.post("/list", ListingController.listListing)
router.post("/update", ListingController.updateListing)

module.exports = router