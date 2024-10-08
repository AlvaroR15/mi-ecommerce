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
        stock:{
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
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
        
        Product.belongsToMany(models.Cart, {
            as: 'carts',
            through: 'cartdetail',
            foreignKey: 'productId',
            otherKey: 'cartId'
        });
    };

    return Product
}