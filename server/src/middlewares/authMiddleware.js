function authMiddleware(req,res,next) {
    if(!req.session.userLogged) {
        return res.status(401).json({
            succes: false,
            status: 401,
            msg: "You must log in"
        })
    };
    next();
}

module.exports = authMiddleware;