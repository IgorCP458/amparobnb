const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('host', 'guest'),
      defaultValue: 'guest',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Listing, { foreignKey: 'hostId', as: 'listings' })
    User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' })
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' })
  }

  return User
}
