'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return [
			await queryInterface.createTable('product', {
				id: {
					allowNull: false,
					type: Sequelize.STRING,
					primaryKey: true
				},
				name: {
					allowNull: false,
					type: Sequelize.STRING
				},
				description: {
					allowNull: true,
					type: Sequelize.STRING
				},
				price: {
					allowNull: true,
					type: Sequelize.INTEGER
				},
				isReady: {
					type: Sequelize.STRING,
					default: true
				},
				categoryId: {
					allowNull: true,
					type: Sequelize.INTEGER,
					references: {
						model: 'category',
						key: 'id'
					},
					onDelete: 'SET NULL'
				},
				collectionId: {
					allowNull: true,
					type: Sequelize.INTEGER,
					references: {
						model: 'collection',
						key: 'id'
					},
					onDelete: 'SET NULL'
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
		return [await queryInterface.dropTable('product')];
	}
};
