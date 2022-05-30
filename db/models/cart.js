import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define(
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
};
