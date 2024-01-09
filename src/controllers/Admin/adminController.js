const { validationResult } = require('express-validator')
const db = require('../../database/models/index');

const adminController = {
    saveProduct: async (req, res) => {        
        try {
            // const categorias = await db.Category.findAll({raw:true});
            // let resultValidation = validationResult(req);
            let file;
            // if (resultValidation.errors.length > 0) {
            //     return res.render('./products/createProduct', {
            //         errors: resultValidation.mapped(),
            //         oldData: req.body,
            //         categorias
            //     })
            // };

            if (req.file.filename) {
                file = req.file.filename;
            };

            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                category_id: +req.body.category,
                picture: file
            });

            return res.status(500).json({
                status: 'okkkk'
            })
        } catch(error) {
            console.log(error);
        }
    },
     editProduct: async (req, res) => {
        try {
            // let resultValidation = validationResult(req);
            // const categoriasData = await db.ProductCategorie.findAll({raw:true})
            // if (resultValidation.errors.length > 0) {
            //     return res.render('./products/editProduct', {
            //         errors: resultValidation.mapped(),
            //         oldData: req.body,
            //         categoriasData
            //     })
            // };

            const productToUpdate = await db.Product.findByPk(req.params.id,{raw:true});
            const file = req.file;

            const productUpdate = {
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                category_id: req.body.category_id,
            }

            if (file) {
                productUpdate.picture = file.filename;
            } else {
                productUpdate.picture = productToUpdate.picture;
            }
            
            await db.Product.update(productUpdate, {where: {id: req.params.id}})

            return res.status(500).json({
                status: 'ojjjj'
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await db.Product.destroy({
                where: {idProd: req.params.id}
            });
            return res.redirect('/products')
        } catch(error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    }
}

module.exports = adminController