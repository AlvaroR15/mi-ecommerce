module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(70)
        },
        email: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER(150),
            foreignKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    User.associate = models => {
        User.hasMany(models.Cart, {
            as: 'userCart',
            foreignKey: 'userId'
        });
        User.hasMany(models.Order, {
            as: 'orderUser',
            foreignKey: 'userId'
        })
    }
    return User;
}