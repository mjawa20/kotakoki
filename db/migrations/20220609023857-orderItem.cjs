'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return [
			await queryInterface.createTable('orderItem', {
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true
				},
				productId: {
					allowNull: false,
					type: Sequelize.STRING,
					references: {
						model: 'product',
						key: 'id'
					},
					onDelete: 'CASCADE'
				},
				orderId: {
					allowNull: false,
					type: Sequelize.INTEGER,
					references: {
						model: 'order',
						key: 'id'
					},
					onDelete: 'CASCADE'
				},
				quantity: {
					allowNull: false,
					type: Sequelize.INTEGER
				},
				total: {
					allowNull: false,
					type: Sequelize.INTEGER
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
		return [await queryInterface.dropTable('orderItem')];
	}
};
