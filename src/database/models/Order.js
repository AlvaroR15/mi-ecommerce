module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        quantity: {
            type: DataTypes.INTEGER(11)
        },
        date: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'orders',
        timestamps: false
    });

    return Cart
}