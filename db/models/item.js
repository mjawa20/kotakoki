import { DataTypes } from 'sequelize';
import { db } from '..';

const Item = db.define(
  'item',
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
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE
  },
  {
    freezeTableName: true,
    tableName: 'item',
    timestamps: false
  }
)

export default Item