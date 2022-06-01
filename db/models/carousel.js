import { DataTypes } from 'sequelize';

export default (sequelize) => {
	sequelize.define(
		'carousel',
		{
			id: {
				allowNull: true,
				primaryKey: true,
				type: DataTypes.NUMBER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			imageUrl: {
				allowNull: false,
				type: DataTypes.STRING
			},
			link: {
				allowNull: false,
				type: DataTypes.STRING
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			tableName: 'carousel'
		}
	);
};
