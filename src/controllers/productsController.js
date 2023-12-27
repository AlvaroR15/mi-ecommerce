const db = require('../database/models/index');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator')


const productsController = {    
    listadoProductos: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['Category'],
            });

            return res.render('./products/productsList', {products: products})
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    buscarProducto: async (req,res) => {
        const textInput = req.body.search;
        try {
            const searchProduct = await db.Product.findAll({
                where: {
                    nombreProd: {[Op.like]: `%${textInput}%`}
                }
            })
            if (searchProduct.length === 1) {
                return res.render('./products/productsList', { products: searchProduct });
            } else if (searchProduct.length > 1) {
                return res.render('./products/productsList', { products: searchProduct });
            } else {
                return res.render('./products/error', { message: 'No se encontro el producto ' + textInput});
            }
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    productosPorCategoria: async (req,res) => {
        try {
            const searchProducts = await db.Product.findAll({
                include: ['Category'],
                where: {
                    '$Category.categoria$': req.params.category
                }
            });

            if (searchProducts) {
                return res.render('./products/productsList', {products: searchProducts})
            }
        } catch(err) {

        }
    },
    listadoProductosUsuario: (req, res) => {
        res.render('./products/myProducts', {
            titulo: 'Tus Productos - Used Fashion',
            css: 'productsList'
        });
    },
    carrito: (req,res) => {
        res.render("./products/productCart", {
            titulo: "Tu carrito - Uptown Urban",
            css: "productCart"
        });
    },
    item: async (req,res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            return res.render('./products/productDetail', {product});
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    crearProducto: async (req, res) => {
        try {
            const categorias = await db.ProductCategorie.findAll({raw:true});
            return res.render('./products/createProduct', {categorias});
        } catch(err) {
            res.status(500).json(err)
        }
    },
    guardarProducto: async (req, res) => {        
        try {
            const categorias = await db.ProductCategorie.findAll({raw:true});
            let resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./products/createProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categorias
                })
            };
            await db.Product.create({
                nombreProd: req.body.nombreProd,
                descripcion: req.body.descripcion,
                precio: +req.body.precio,
                talle: req.body.talle,
                idCategoria: req.body.categoria,
                imagen: req.file.filename
            });
            return res.redirect('products')
        } catch(error) {
            console.log(error);
        }
    },
    editarProducto: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {include:['Category']});
            const categoriasData = await db.ProductCategorie.findAll({raw:true});
            res.render('./products/editProduct', {product:product, categoriasData});
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    actualizarProducto: async (req, res) => {
        try {
            let resultValidation = validationResult(req);
            const categoriasData = await db.ProductCategorie.findAll({raw:true})
            if (resultValidation.errors.length > 0) {
                return res.render('./products/editProduct', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categoriasData
                })
            };

            const productToUpdate = await db.Product.findByPk(req.params.id,{raw:true});
            const file = req.file;

            const productUpdate = {
                nombreProd: req.body.nombreProd,
                descripcion: req.body.descripcion,
                precio: +req.body.precio,
                talle: req.body.talle,
                idCategoria: req.body.categoria,
            }

            if (file) {
                productUpdate.imagen = file.filename;
            } else {
                productUpdate.imagen = productToUpdate.imagen;
            }
            
            await db.Product.update(productUpdate, {where: {idProd: req.params.id}})

            return res.redirect('/products')
        } catch (error) {
            return res.status(500).json({msg:'Ha ocurrido un error.', error:error})
        }
    },
    borrarProducto: async (req, res) => {
        try {
            await db.Product.destroy({
                where: {idProd: req.params.id}
            });
            return res.redirect('/products')
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
}

module.exports = productsController;