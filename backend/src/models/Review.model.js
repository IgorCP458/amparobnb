const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: DataTypes.TEXT,
  })

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'author' })
    Review.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' })
  }

  return Review
}
