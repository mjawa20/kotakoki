'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.createTable('user', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        surName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sessionId: {
          allowNull: true,
          type: Sequelize.STRING
        },
        role: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ['admin', 'user'],
          defaultValue: 'user'
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
    return [await queryInterface.dropTable('user')];
  }
};
