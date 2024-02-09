module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'cart',
        timestamps: false
    });

    return Cart
}