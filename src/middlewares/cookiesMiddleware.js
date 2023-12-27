const db = require('../database/models/index');

async function cookiesMiddleware(req,res,next) {
    if(req.cookies.userLogged) {
        const user = await db.User.findOne({where:{email: req.cookies.userLogged}, raw:true});
        if(user) {
            req.session.userLogged = user.email;
        }
    };

    next();
}

module.exports = cookiesMiddleware;