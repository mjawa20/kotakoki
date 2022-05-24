import { DataTypes } from 'sequelize';
import { db } from '..';

const Collection = db.define(
  'collection',
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
    categoryId: {
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
    tableName: 'collection'
  }
)

export default Collection