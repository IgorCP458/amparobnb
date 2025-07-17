const {Listing} = require("../models");
const {Op} = require('sequelize')

async function createListing(req, res) {
  const allowedFields = ['title', 'description', 'location', 'pricePerNight', 'maxGuests', 'maxGuests', 'imageUrls', 'hostId']
  const listingData = {}
  const {listingParams} = req.body
  allowedFields.forEach(field => {
    if(listingParams[field] !== undefined) {
      listingData[field] = listingParams[field]
    }
  });
  const listing = await Listing.create(listingData)
  res.json(listing)
}

async function deleteListing(req, res) {
  const {listingParams} = req.body
  try {
    await Listing.destroy({where: {
    id: listingParams.id
    }})
    res.json({"msg": "Listing deletada com sucesso"})
  } catch (error) {
    res.json(error)
  }
}

async function listListing(req, res) {
  const {filterParams} = req.body
  const listings = await Listing.findAll()
  res.send(listings)
}

async function updateListing(req, res) {
  allowedFields = ['title', 'description', 'location', 'pricePerNight', 'maxGuests', 'imageUrls']
}

module.exports = {
  createListing,
  deleteListing,
  listListing,
  updateListing,
};
