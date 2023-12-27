module.exports = (sequelize, DataTypes)=>{
    const ProductCategorie = sequelize.define("ProductCategorie",{
        idCategoria:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoria:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    },
    {
        tableName:"productcategories",
        timestamps: false
    });

    ProductCategorie.associate = function(models)  {
        ProductCategorie.hasMany(models.Product,{
            as: "Products",
            foreignKey: "idCategoria",
        })
    }

    return ProductCategorie;
    
}