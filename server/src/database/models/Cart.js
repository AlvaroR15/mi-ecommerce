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
        dateCreation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        state: {
            type: DataTypes.ENUM('Pendiente','Completado','Cancelado')
        }
    }, {
        tableName: 'cart',
        timestamps: false
    });

    Cart.associate = models => {
        Cart.belongsTo(models.User, {
            as: 'cartUser',
            foreignKey: 'userId'
        }),
        Cart.belongsToMany(models.Product, {
            as: 'products',
            through: 'cartdetail',
            foreignKey: 'cartId',
            otherKey: 'productId'
        })
    }
    return Cart
}