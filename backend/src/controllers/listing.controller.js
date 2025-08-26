const {Listing, Booking} = require("../models");
const {Op} = require('sequelize')

async function createListing(req, res) {
  const allowedFields = ['title', 'description', 'location', 'pricePerNight', 'maxGuests', 'imageUrls', 'hostId']
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
  const filter = {}
  const allowedFields = ['hostId', 'pricePerNight', 'guests', 'id']
  let idList = []

  allowedFields.forEach(field => {
    if (filterParams[field] !== undefined) {
      if(field === 'guests') {
        filter.maxGuests = {
          [Op.gte]: filterParams[field]
        }
      } else if(field === 'pricePerNight') {
        filter.pricePerNight = {
          [Op.lte]: filterParams[field]
        }
      } else if(field === 'id') {
        if(filterParams[field] !== null) {
          if(typeof filterParams[field] === 'string') {
            idList.push(filterParams[field])
          } else if (typeof filterParams[field] === 'array') {
            idList = filterParams[field]
          }
        }
        filter.id = {
          [Op.in]: idList
        }
      } else {
        filter[field] = filterParams[field]
      }
    }
    
  })
  const listings = await Listing.findAll({where: filter})
  res.send(listings)
}

async function updateListing(req, res) {
  allowedFields = ['title', 'description', 'location', 'pricePerNight', 'maxGuests', 'imageUrls', 'listingType']
  const {listings} = req.body

  if (!Array.isArray(listings)) {
    res.status(400).json({msg: "listings deve ser um Array"})
  }

  const results = []

  for (const listing of listings) {
    const {listingId, fieldsToUpdate} = listing

    if(!listingId) {
      results.push({success: false, message: "ID não encontrado", listing})
    }

    try {
      const [updated] = await Listing.update(fieldsToUpdate, {where: {
        id: listingId
      }})
      if(updated) {
        results.push({success: true, listingId})
      } else {
        results.push({success: false, message: "Listing não encontrada"})

      }
    } catch (error) {
      results.push({success: false, listingId, error: error.message})
      
    }

  }
  res.json(results)  
}

module.exports = {
  createListing,
  deleteListing,
  listListing,
  updateListing,
};
