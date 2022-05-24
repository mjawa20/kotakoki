'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.createTable('productImage', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        productId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'product',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    ]
  },

  async down(queryInterface) {
    return [await queryInterface.dropTable('productImage')]
  }
};
