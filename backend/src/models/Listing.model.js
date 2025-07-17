const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Listing = sequelize.define('Listing', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    pricePerNight: DataTypes.FLOAT,
    maxGuests: DataTypes.INTEGER,
    imageUrls: {
      type: DataTypes.JSON, // array de strings
      defaultValue: [],
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

  })

  Listing.associate = (models) => {
    Listing.belongsTo(models.User, { foreignKey: 'hostId', as: 'host' })
    Listing.hasMany(models.Booking, { foreignKey: 'listingId', as: 'bookings' })
    Listing.hasMany(models.Review, { foreignKey: 'listingId', as: 'reviews' })
  }

  return Listing
}
