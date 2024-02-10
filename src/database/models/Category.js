module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false
        }
    }, {
        tableName: 'categories',
        timestamps: false
    });
    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        })
    }
    return Category
}