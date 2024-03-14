module.exports = (sequelize, DataTypes) => {
    const CartDetail = sequelize.define('CartDetail', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cartId: {
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL(10,2)
        }
    }, {
        tableName: 'cartdetail',
        timestamps: false
    });

    CartDetail.associate = models => {
        CartDetail.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'productId'
        })
    }

    return CartDetail
}