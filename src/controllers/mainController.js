const db = require('../database/models/index');

const mainController = {
    index: async (req,res) => {
        try {
            const products = await db.Product.findAll({
                raw:true,
                limit: 4,
                order: [['idProd','DESC']]
            });
            const categories = await db.ProductCategorie.findAll({raw:true});
            const categorias = categories.map(category => category.categoria)
            return res.render('./index', {products, categorias})
        } catch(error) {
            console.log(error);
        }
    },
}
module.exports = mainController;