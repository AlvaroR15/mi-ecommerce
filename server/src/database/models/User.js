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
        addres: {
            type: DataTypes.STRING(100),
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
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING(20)
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
        tableName: 'users',
        timestamps: true,
        paranoid: true
    });

    User.associate = models => {
        User.hasMany(models.Cart, {
            as: 'userCart',
            foreignKey: 'userId'
        });
    }
    return User;
}