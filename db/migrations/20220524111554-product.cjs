'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return [
			await queryInterface.createTable('product', {
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
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
					onDelete: 'NO ACTION'
				},
				collectionId: {
					allowNull: true,
					type: Sequelize.INTEGER,
					references: {
						model: 'collection',
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
			})
		];
	},

	async down(queryInterface) {
		return [await queryInterface.dropTable('product')];
	}
};
