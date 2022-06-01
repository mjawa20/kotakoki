'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.createTable('carousel', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        imageUrl: {
          allowNull: false,
          type: Sequelize.STRING
        },
        link: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ];
  },

  async down(queryInterface) {
    return [await queryInterface.dropTable('carousel')];
  }
};
