const { Product, User, Cart, CartDetail } = require('../../database/models/index');
const { Op } = require('sequelize');

const productAPIController = {
    /**
     * List all products with pagination.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;

            const { count, rows: productsInfo } = await Product.findAndCountAll({
                raw: true,
                attributes: ['id', 'name', 'description', 'price', 'size', 'image'],
                limit: limit,
                offset: offset
            });

            const products = productsInfo.map(product => ({
                ...product,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + product.image
            }));

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    totalProducts: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page
                },
                data: products
            });
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error.', errorDetails: error });
        }
    },

    /**
     * Get the latest products (up to 4 items).
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    lastProducts: async (req, res) => {
        try {
            const getLastProducts = await Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'price', 'image'],
                order: [['id', 'DESC']],
                limit: 4
            });

            const lastProducts = getLastProducts.map(product => ({
                ...product,
                image: req.protocol + '://' + req.get('host') + '/uploads/products/' + product.image,
            }));

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200
                },
                data: lastProducts
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Ha ocurrido un error', error: error });
        }
    },

    /**
     * Get a random product on offer.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    productOnOffer: async (req, res) => {
        const countProducts = await Product.count();
        const idRandom = Math.floor(Math.random() * countProducts + 1);
        const chooseProduct = await Product.findOne({
            raw: true,
            attributes: ['id', 'name', 'price', 'image', 'size'],
            where: { id: idRandom }
        });

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
            data: productSelected
        });
    },

    /**
     * Get detailed information about a specific product by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
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

            return res.status(200).json({ product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'Ha ocurrido un error.': error });
        }
    },

    /**
     * Search for products by name.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    searchProduct: async (req, res) => {
        const textInput = req.body.search;
        try {
            const searchProducts = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${textInput}%`
                    }
                },
                attributes: ['id', 'name', 'description', 'price', 'image']
            });

            if (searchProducts.length == 0) {
                return res.status(404).json({
                    meta: {
                        success: false,
                        status: 404,
                        msg: 'Products not found'
                    }
                });
            }

            const productsFound = searchProducts.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: `${req.protocol}://${req.get('host')}/uploads/products/${product.image}`
            }));

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'Products found'
                },
                data: productsFound
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Occurred an error'
                },
                error
            });
        }
    },

    /**
     * Get the user's cart.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    cart: async (req, res) => {
        try {
            const userId = req.user.id;
            const userCart = await User.findOne({
                attributes: ['id', 'email'],
                where: { id: userId },
                include: {
                    model: Cart,
                    as: 'userCart',
                    where: { state: 'Pendiente' },
                    include: {
                        model: Product,
                        as: 'products',
                        through: { model: CartDetail },
                        attributes: ['id', 'name', 'price', 'image'],
                    }
                }
            });

            if (!userCart) {
                return res.status(404).json({
                    meta: {
                        success: false,
                        status: 404,
                        msg: "User's cart not found"
                    },
                    data: {}
                });
            }

            const productsData = userCart.userCart.flatMap(cartItem => cartItem.products);
            const products = productsData.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                image: `${req.protocol}://${req.get('host')}/uploads/products/${product.image}`,
                cartDetail: {
                    id: product.cartdetail.id,
                    cartId: product.cartdetail.cartId,
                    productId: product.cartdetail.productId,
                    quantity: product.cartdetail.quantity,
                    subtotal: product.cartdetail.subtotal
                }
            }));

            const data = { products };

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: "User's products"
                },
                data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Occurred an error'
                }
            });
        }
    },

    /**
     * Add a product to the user's cart.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    addCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            const newCart = await Cart.create({
                userId: user.id,
                state: 'Pendiente'
            });

            if (newCart) {
                const cartProductInfo = await CartDetail.create({
                    cartId: newCart.id,
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                    subtotal: (req.body.price * req.body.quantity)
                });

                return res.status(201).json({
                    meta: {
                        success: true,
                        status: 201,
                        msg: 'Product added to cart successfully'
                    },
                    data: {
                        cart: newCart,
                        cartProductInfo
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Occurred an error'
                }
            });
        }
    },

    /**
     * Delete a cart and its details.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    deleteCart: async (req, res) => {
        try {
            // Cancel the cart
            await Cart.update({
                state: 'Cancelado'
            }, { where: { id: req.body.cartId } });

            // Delete cart details
            await CartDetail.destroy({
                where: { cartId: req.body.cartId }
            });

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'Cart deleted successfully'
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Occurred an error'
                }
            });
        }
    },

    /**
     * Create a new product.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    saveProduct: async (req, res) => {
        try {
            let file;
            if (req.file.filename) {
                file = req.file.filename;
            }

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
                msg: 'Product successfully created',
                product: product
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: 'Error saving product'
            });
        }
    },

    /**
     * Edit an existing product.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
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
            };

            if (file) {
                productUpdate.image = file.filename;
            } else {
                productUpdate.image = productToUpdate.image;
            }

            await Product.update(productUpdate, { where: { id: req.params.id } });

            return res.status(200).json({
                status: 'Product updated successfully'
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Delete a product by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    deleteProduct: async (req, res) => {
        try {
            await Product.destroy({
                where: { id: req.params.id }
            });
            return res.status(200).json({
                msg: 'Product deleted'
            });
        } catch (error) {
            res.status(500).json('Ha ocurrido un error.', error);
        }
    }
};

module.exports = productAPIController;
