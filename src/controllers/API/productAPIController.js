const db = require('../../database/models/index');

const productAPIController = {
    list: async (req, res) => {
        try {
            const productsInfo = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'description', 'price', 'size','image'],
                include: ['categories']
            })
            const getLastProducts = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'price', 'image'],
                order: [['id', 'DESC']],
                limit: 4
            })

            const products = productsInfo.map(product => ({
                ...product,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + product.image
            }))

            const lastProducts = getLastProducts.map(product => ({
                ...product,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + product.image
            }))

            const countProducts = await db.Product.count();
            const idRandom = Math.floor(Math.random() * countProducts + 1);
            const chooseProduct = await db.Product.findOne({
                raw: true,
                attributes: ['id','name','price','image'],
                where: {id: idRandom}
            })

            const productSelected = chooseProduct ? {
                id: chooseProduct.id,
                name: chooseProduct.name,
                price: chooseProduct.price,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + chooseProduct.image
            } : null;

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200
                },
                data: {
                    products,
                    lastProducts,
                    productSelected
                }
            })
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ha ocurrido un error.', errorDetails: error });
        }
    },
    detail: async (req, res) => {
        try {
            const searchProduct = await db.Product.findOne({
                where: {id: req.params.id},
                attributes: ['id','name','description','price','size','image']
            });
            const product = searchProduct ? {
                id: searchProduct.id,
                name: searchProduct.name,
                price: searchProduct.price,
                description: searchProduct.description,
                size: searchProduct.size,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + searchProduct.image
            } : null;
            return res.status(200).json({ product })

        } catch (error) {
            console.log(error);
            res.status(500).json({'Ha ocurrido un error.': error})
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
    addCart: async(req,res) => {

    },
    saveProduct: async (req, res) => {
        try {
            let file;
            if (req.file.filename) {
                file = req.file.filename;
            };

            const product = await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                size: req.body.size,
                image: file,
                categoryId: +req.body.categoryId,
            });

            return res.status(201).json({
                success: true,
                msg: 'successfully created product',
                product: product
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: 'error saving product'
            })
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
                size: req.body.size,
                image: file,
                categoryId: +req.body.categoryId,
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