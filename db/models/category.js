import { DataTypes } from 'sequelize';
import { db } from '..';

const Category = db.define(
  'category',
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    freezeTableName: true,
    tableName: 'category'
  }
)

export default Category