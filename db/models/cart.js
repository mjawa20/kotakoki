import { DataTypes } from 'sequelize';

export default (sequelize) => {
	const Cart = sequelize.define(
		'cart',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			productId: {
				allowNull: false,
				type: DataTypes.STRING,
				references: {
					model: 'product',
					key: 'id'
				}
			},
			quantity: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			total: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			tableName: 'cart'
		}
	);
	Cart.associate = function (models) {
		Cart.belongsTo(models.product)
	};
	return Cart 
};
