const { Product, User, Cart } = require('../../database/models/index');

const productAPIController = {
    list: async (req, res) => {
        try {
            const productsInfo = await Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'description', 'price', 'size', 'image'],
                include: ['categories']
            })
            const getLastProducts = await Product.findAll({
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

            const countProducts = await Product.count();
            const idRandom = Math.floor(Math.random() * countProducts + 1);
            const chooseProduct = await Product.findOne({
                raw: true,
                attributes: ['id', 'name', 'price', 'image', 'size'],
                where: { id: idRandom }
            })

            const productSelected = chooseProduct ? {
                id: chooseProduct.id,
                name: chooseProduct.name,
                price: Math.round(chooseProduct.price),
                size: chooseProduct.size,
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
            const searchProduct = await Product.findOne({
                where: { id: req.params.id },
                attributes: ['id', 'name', 'description', 'price', 'size', 'image']
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
            res.status(500).json({ 'Ha ocurrido un error.': error })
        }
    },
    searchProduct: async (req, res) => {
        const textInput = req.body.search;
        try {
            const searchProducts = await Product.findAll({
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
    cart: async (req, res) => {
        if (!req.session.userLogged) {
            return res.status(403).json({
                meta: {
                    success: false,
                    status: 403,
                    msg: "There is no registered user"
                }
            })
        }
        try {
            const user = await User.findOne({
                where: {email: req.session.userLogged},
                include: ['Cart']
            });
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: "User's products"
                },
                data: {
                    user
                }
            })
        } catch(error) {}
    },
    addCart: async (req, res) => {
        if (!req.session.userLogged) {
            return res.status(403).json({
                meta: {
                    success: false,
                    status: 403,
                    msg: "There is no registered user"
                }
            })
        }
        try {
            const user = await User.findOne({where: {email: req.session.userLogged}});
            await Cart.create({
                userId: user.id,
                productId: req.body.productId,
                quantity: req.body.quantity
            });

            return res.status(201).json({
                meta: {
                    success: true,
                    status: 201,
                    msg: 'Product added to cart successfully'
                }
            })
            
        } catch(error) {}
    },
    saveProduct: async (req, res) => {
        try {
            let file;
            if (req.file.filename) {
                file = req.file.filename;
            };

            const product = await Product.create({
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
            const productToUpdate = await Product.findByPk(req.params.id, { raw: true });
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

            await Product.update(productUpdate, { where: { id: req.params.id } })

            return res.status(500).json({
                status: 'ojjjj'
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.destroy({
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