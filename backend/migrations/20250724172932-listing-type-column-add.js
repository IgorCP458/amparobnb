'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('listings', 'listingType', {
      type: DataTypes.ENUM,
      values: ['Quarto', 'Casa', 'Apartamento', 'Loft', 'Chalé', 'Cabana'],
      defaultValue: 'Quarto',
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('listings', 'listingType')
  }
};
