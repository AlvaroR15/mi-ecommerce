module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(180),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            unsigned: true
        },
        size: {
            type: DataTypes.STRING(10)
        },
        image: {
            type: DataTypes.STRING(20)
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'products',
        paranoid: true
    })

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'categoryId'
        });
        
        Product.belongsTo(models.Cart, {
            as: 'productCart',
            foreignKey: 'productId'
        });

        Product.belongsTo(models.Order, {
            as: 'orderProduct',
            foreignKey: 'productId'
        });
    };

    return Product
}