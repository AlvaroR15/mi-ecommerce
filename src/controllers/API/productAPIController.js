const db = require('../../database/models/index');
const fs = require('fs');
const path = require('path');

const productAPIController = {
    product: async (req, res) => {
        try{
            const Data = await db.Product.findByPk(req.params.id, {
                attributes:["idProd","nombreProd","descripcion","precio","talle","idCategoria","imagen"],
                raw:true
            });
            const CategoryData = await db.ProductCategorie.findOne({
                attributes: ["categoria"],
                where: { idCategoria: Data.idCategoria },
                raw:true
            })
            const product ={
                idProd: Data.idProd,
                nombreProd: Data.nombreProd,
                descripcion: Data.descripcion,
                precio: Data.precio,
                talle: Data.talle,
                Categoria: CategoryData ? CategoryData.categoria : null,
                imagen: req.protocol + '://' + req.get('host') + '/img/products/' + Data.imagen
            }
            return res.status(200).json(product)
        }
        catch(error){
            res.json(error)
        }
    },
    products: async (req, res) => {
        try{
            const Data = await db.Product.findAll({
                attributes:["idProd","nombreProd","descripcion","precio","talle","idCategoria","imagen"],
                raw:true
            });
            const CategoryData = await db.ProductCategorie.findAll({
                attributes: ["idCategoria","categoria",[db.sequelize.literal('(SELECT COUNT(*) FROM products WHERE products.idCategoria = ProductCategorie.idCategoria)'), 'Cantidad']],
                raw:true
            })

            const products = Data.map(product => {
                const category = CategoryData.find(cat => cat.idCategoria === product.idCategoria);

                return {
                    ...product,
                    imageURL: req.protocol + '://' + req.get('host') + '/img/products/' + product.imagen,
                    Categoria: category ? category.categoria : null,
                    detail: req.protocol + '://' + req.get('host') + '/api' + req.url + "/" + product.idProd
                };
            });
            const CategoryCounts = CategoryData.reduce((acc, category) => {
                acc[category.categoria] = category.Cantidad;
                return acc;
            }, {});
            return res.status(200).json({
                Count: products.length,
                CategoryCounts,
                products
            })
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ha ocurrido un error.', errorDetails: error });
        }
    }
}

module.exports =productAPIController;