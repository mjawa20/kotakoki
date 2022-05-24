import { DataTypes } from 'sequelize';

export default (sequelize) => {
	const Image = sequelize.define(
		'image',
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
			productId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'product',
					key: 'id'
				}
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			tableName: 'image'
		}
	);
	Image.associate = function (models) {
		Image.belongsTo(models.product, { as: 'product', foreignKey: 'productId' });
	};
	return Image;
};
