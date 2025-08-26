const { Op } = require("sequelize");
const { Booking } = require("../models");
const { Listing } = require("../models");

async function createBooking(req, res) {
  const { listingId, listingName, userId, guestName, startDate, endDate, totalPrice } = req.body;

  if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: "Datas inválidas: a data de início deve ser anterior à data de fim." });
  }

  const now = new Date();
  if (new Date(startDate) < now || new Date(endDate) < now) {
    return res.status(400).json({ message: "Não é possível reservar datas no passado." });
  }

  try {

    const conflictingBookings = await Booking.findAll({
      where: {
        listingId,
        [Op.and]: [
          {
            startDate: {[Op.lte]: endDate},
            endDate: {[Op.gte]: startDate}
          }
        ]
      }
    })
  
    if (conflictingBookings.length > 0) {
      return res.status(400).json({ message: "A data já está reservada!" });
    }

    const booking = await Booking.create({
      startDate,
      endDate,
      totalPrice,
      status: 'pending',
      userId,
      listingId,
      listingName,
      guestName

    })
    res.json(booking)
  } catch (error) {
    res.json({message: "Erro ao criar reserva", error: error})
  }
}

async function deleteBooking(req, res) {
  const {bookingId} = req.body
  try {
    const countDeleted = await Booking.destroy({
      where: {
        id: bookingId
      }
    })
    if( countDeleted > 0) {
      res.json({ msg: "Reserva deletada :)" });
    } else {
      res.json({ msg: "Nenhuma Reserva deletada :(" });

    }
  } catch (error) {
    res.json({msg: "Erro ao deletar Booking"})
  }
}

async function listBooking(req, res) {
  const {filterParams} = req.body
  const allowedFields = ['listingId', 'startDate', 'endDate', 'userId']
  const filters = {}

  allowedFields.forEach(field => {
    if(filterParams[field] !== undefined) {
      if(field !== 'endDate' && field !== 'startDate') {
        filters[field] = filterParams[field]
      }
    }
  })

  try {
    const bookings = await Booking.findAll({where: 
      filters,
      [Op.and]: [{
        startDate: {[Op.gte]: filterParams.startDate},
        endDate: {[Op.ltd]: filterParams.endDate}
      }]
    }) 
    res.json(bookings);
  } catch (error) {
    res.status(400).json({msg: "Erro ao buscar reservas"})
  }
}

async function updateBooking(req, res) {
  const {status, bookingId} = req.body
  try {
    await Booking.update({
      status
    }, {where: {
      id: bookingId 
    }})
    res.json({ msg: "Reserva atualizada!", bookingId, status });
  } catch (error) {
    res.json({msg: "Erro ao atualizar reserva", error})
  }
}

module.exports = {
  createBooking,
  deleteBooking,
  listBooking,
  updateBooking,
};
