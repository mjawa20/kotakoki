import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProductImage = sequelize.define(
    'productImage',
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
      tableName: 'productImage'
    }
  )
  ProductImage.associate = function (models) {
    ProductImage.belongsTo(models.product, { as: 'product', foreignKey: 'productId' })
  }
  return ProductImage
}