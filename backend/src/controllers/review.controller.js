const {Listing, Booking, Review} = require('../models')

async function createReview (req, res) {
  const {rating, comment, listingId, userId} = req.body
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({msg: "Rating deve ser um número inteiro entre 1 e 5"})
  }

  try {
    const review = await Review.create({
      rating,
      comment: comment || null,
      listingId,
      userId
    })
    res.json({msg: "Obrigado pela avaliação", review})
  } catch (error) {
    res.json({msg: "Erro ao criar Review"})
  }
}

async function deleteReview (req, res) {
  const {reviewId} = req.body
  try {
    const countDeleted = await Review.destroy({where: {
      id: reviewId
    }})
    if(countDeleted > 0) {
      res.json({msg: "Review deletado com sucesso :)"})
    } else {
      res.json({msg: "Nenhum review deletado :("})
    }
  } catch (error) {
    res.json({msg: "Erro ao deletar review"})
  }
}

async function listReview (req, res) {
  const {filterParams} = req.body
  const reviews = await Review.findAll({where: filterParams})
  res.json(reviews)
}

module.exports = {
  createReview,
  deleteReview,
  listReview,
}