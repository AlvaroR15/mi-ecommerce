function authMiddleware(req,res,next) {
    if(!req.session.userLogged) {
        return res.status(403).json({
            msg: 'User not logged in'
        })
    };
    next();
}

module.exports = authMiddleware;