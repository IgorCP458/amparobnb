'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'listings',
          'bedCount',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'listings',
          'bathroomCount',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
