import { DataTypes } from 'sequelize';

export default (sequelize) => {
	const OrderItem = sequelize.define(
		'orderItem',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			productId: {
				allowNull: false,
				type: DataTypes.STRING,
				references: {
					model: 'product',
					key: 'id'
				}
			},
			orderId: {
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
			tableName: 'orderItem'
		}
	);
	OrderItem.associate = function (models) {
		OrderItem.belongsTo(models.product)
		OrderItem.belongsTo(models.order)
	};
	return OrderItem
};
