const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    totalPrice: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    guestName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    listingName: {
      type: DataTypes.STRING,
      allowNull: false
    }

  })

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'guest' })
    Booking.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' })
  }

  return Booking
}
