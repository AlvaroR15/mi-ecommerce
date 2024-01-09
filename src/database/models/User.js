module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        picture: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        timestamps: true
    })
    return User;
}