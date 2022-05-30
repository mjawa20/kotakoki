import { DataTypes } from 'sequelize';

export default (sequelize) => {
	sequelize.define(
		'user',
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
			surName: {
				allowNull: false,
				type: DataTypes.STRING
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING
			},
			role: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: ['admin', 'user'],
				defaultValue: 'user'
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			tableName: 'user'
		}
	);
};
