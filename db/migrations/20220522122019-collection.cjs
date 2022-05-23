'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.createTable('collection', {
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
        categoryId: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'category',
            key: 'id'
          },
          onDelete: 'NO ACTION'
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
    return [await queryInterface.dropTable('collection')]
  }
};
