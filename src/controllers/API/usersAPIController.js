const db = require('../../database/models/index');

const usersAPIController = {
    users: async (req,res) => {
        try {
            const usersData = await db.User.findAll({
                attributes: ['id','fullname','email'],
                raw:true
            });
            const users = usersData.map(user => ({
                ...user,
                detail: req.protocol + '://' + req.get('host') + '/api' + req.url + '/' +user.id
            }))
            return res.status(200).json({
                count: users.length,
                users
            })
        } catch(error) {
            return res.json('Ha ocurrido un error.',error)
        }
    },
    user: async (req,res) => {
        try {
            const usersData = await db.User.findByPk(req.params.id, {
                attributes: ['id','fullname','email', 'profilePicture'],
                raw: true
            });

            const user = {
                id: usersData.id,
                nombre: usersData.fullname,
                email: usersData.email,
                imagen: req.protocol + '://' + req.get('host') + '/img/users/' + usersData.profilePicture
            }
            
            return res.status(200).json(user)

        } catch(error) {
            res.json(error)
        }
    }
};

module.exports = usersAPIController;