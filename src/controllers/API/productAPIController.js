const db = require('../../database/models/index');

const productAPIController = {
    list: async (req, res) => {
        try {
            const productsInfo = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'description', 'price', 'category_id', 'picture']
            })
            const getLastProducts = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'price', 'picture'],
                order: [['id', 'DESC']],
                limit: 4
            })

            const products = productsInfo.map(product => ({
                ...product,
                picture: req.protocol + '://' + req.get('host') + '/img/products/' + product.picture
            }))

            const lastProducts = getLastProducts.map(product => ({
                ...product,
                picture: req.protocol + '://' + req.get('host') + '/img/products/' + product.picture
            }))

            const countProducts = await db.Product.count();
            const idRandom = Math.floor(Math.random() * countProducts + 1);
            const chooseProduct = await db.Product.findOne({
                raw: true,
                attributes: ['id','name','price','picture'],
                where: {id: idRandom}
            })

            const productSelected = chooseProduct ? {
                id: chooseProduct.id,
                name: chooseProduct.name,
                price: chooseProduct.price,
                picture: req.protocol + '://' + req.get('host') + '/img/products/' + chooseProduct.picture
            } : null;

            return res.status(200).json({
                status: 'ok',
                products,
                lastProducts,
                productSelected
            })
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ha ocurrido un error.', errorDetails: error });
        }
    },
    detail: async (req, res) => {
        try {
            const searchProduct = await db.Product.findByPk(req.params.id);
            const product = searchProduct ? {
                id: searchProduct.id,
                name: searchProduct.name,
                price: searchProduct.price,
                description: searchProduct.description,
                picture: req.protocol + '://' + req.get('host') + '/img/products/' + searchProduct.picture
            } : null;
            return res.status(200).json({ product })

        } catch (error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },
    searchProduct: async (req, res) => {
        const textInput = req.body.search;
        try {
            const searchProducts = await db.Product.findAll({
                where: {
                    name: { [Op.like]: `%${textInput}%` },
                    attributes: ['name', 'description', 'price']
                }
            });
            return res.status(200).json({
                searchProducts
            })
        } catch (error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    },

    saveProduct: async (req, res) => {
        try {
            let file;
            if (req.file.filename) {
                file = req.file.filename;
            };

            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                size: req.body.size,
                picture: file,
                category_id: +req.body.category_id,
            });

            return res.status(500).json({
                status: 'Product created'
            })
        } catch (error) {
            console.log(error);
        }
    },
    editProduct: async (req, res) => {
        try {
            const productToUpdate = await db.Product.findByPk(req.params.id, { raw: true });
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

            await db.Product.update(productUpdate, { where: { id: req.params.id } })

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
                where: { id: req.params.id }
            });
            return res.status(200).json({
                msg: 'Product deleted'
            })
        } catch (error) {
            res.status(500).json('Ha ocurrido un error.', error)
        }
    }
}

module.exports = productAPIController;