const db = require('../../database/models/index');

const generalApiController = {
    index: async (req,res) => {
        try {
            const products = await db.Product.findAll({raw:true});
            const users = await db.User.findAll({raw:true});
            const categories = await db.ProductCategorie.findAll({raw:true});
            const CategoryData = await db.ProductCategorie.findAll({
                attributes: ["idCategoria","categoria",[db.sequelize.literal('(SELECT COUNT(*) FROM products WHERE products.idCategoria = ProductCategorie.idCategoria)'), 'Cantidad']],
                raw:true
            });
            const CategoryCounts = CategoryData.reduce((acc, category) => {
                acc[category.categoria] = category.Cantidad;
                return acc;
            }, {});

            const lastUserSelect = users[users.length - 1];
            const lastUser = {
                ...lastUserSelect,
                imagen: req.protocol + '://' + req.get('host') + '/img/users/' + lastUserSelect.profilePicture
            }

            const lastProductSelect = products[products.length - 1];
            const lastProduct = {
                ...lastProductSelect,
                imagen: req.protocol + '://' + req.get('host') + '/img/products/' + lastProductSelect.imagen
            }

            return res.status(200).json({
                info: [
                    {
                        titulo: 'Productos totales',
                        total: products.length,
                        icono: "fas fa-tshirt fa-2x"
                    },
                    {
                        titulo: 'Usuarios registrados',
                        total: users.length,
                        icono: "fas fa-user fa-2x"
                    },
                    {
                        titulo: 'Categorias cargadas',
                        total: categories.length,
                        icono: "fas fa-tag fa-2x"
                    }
                ],
                lastProduct,
                lastUser,
                CategoryCounts
            })
        } catch(error) {
            return res.status(500).json({
                error: error
            })
        }
    }
}

module.exports = generalApiController;