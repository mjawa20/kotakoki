import { DataTypes } from 'sequelize';
import { db } from '..';

const Collection = db.define(
  'collection',
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