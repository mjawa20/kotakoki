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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    freezeTableName: true,
    tableName: 'collection',
    timestamps: false
  }
)

export default Collection