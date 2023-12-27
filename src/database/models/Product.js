module.exports = (sequelize, DataTypes)=>{
    const Product = sequelize.define("Product",{
        idProd:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreProd:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        talle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCategoria: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        imagen:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "products",
        timestamps: false,
        paranoid: true
    });

    Product.associate = function(models){
        Product.belongsTo(models.ProductCategorie,{
            as: "Category",
            foreignKey: "idCategoria",
        });
        Product.belongsToMany(models.User,{
            through: 'usersproducts',
            foreignKey:"id",
            as: "users",
        });
    }

    return Product;
}