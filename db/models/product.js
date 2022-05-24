import { DataTypes } from 'sequelize';
import { uid } from 'uid';

export default (sequelize) => {
	const Product = sequelize.define(
		'product',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.STRING
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			price: {
				allowNull: false,
				type: DataTypes.NUMBER
			},
			description: {
				allowNull: false,
				type: DataTypes.STRING
			},
			categoryId: {
				type: DataTypes.NUMBER,
				validate: {
					notEmpty: false
				},
				allowNull: true
			},
			collectionId: {
				type: DataTypes.NUMBER,
				validate: {
					notEmpty: false
				},
				allowNull: true
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			tableName: 'product'
		}
	);

  Product.beforeValidate(async (product) => {
    if (product.id) return
    product.id = uid()
  })

	Product.associate = function (models) {
		Product.hasMany(models.image, {
			as: 'images',
			foreignKey: 'productId',
			hooks: true,
			onDelete: 'CASCADE',
      
		});
	};

	return Product;
};
