const { User } = require('../database/models/index');
async function authMiddleware(req,res,next) {
    if(req.session.userLogged) {
        const user = await User.findOne({where:{email: req.session.userLogged}});

        if (user) {
            req.user = user;
            res.cookie('user', JSON.stringify({id:user.id, email: user.email}), {
                maxAge: 60 * 60 * 1000,
                secure: false,
                httpOnly: false,
                sameSite: 'lax'
            });
        };
        next();
    }
}

module.exports = authMiddleware;