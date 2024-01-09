const db = require('../database/models/index');
const { Op } = require('sequelize');

const productsController = {
    productList: async (req,res) => {
        try{
            const products = await db.Product.findAll({
                raw: true,
                attributes: ['id','name','description','price','picture']
            })
            return res.status(200).json({products})
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ha ocurrido un error.', errorDetails: error });
        }
    },
    detail: async (req,res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            return res.status(200).json({product})

        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    buscarProducto: async (req,res) => {
        const textInput = req.body.search;
        try {
            const searchProducts = await db.Product.findAll({
                where: {
                    name: {[Op.like]: `%${textInput}%`},
                    attributes: ['name','description','price']
                }
            });
            return res.status(200).json({
                searchProducts
            })
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    }
}

module.exports = productsController;