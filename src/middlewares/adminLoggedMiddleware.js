function adminLoggedMiddleware(req,res,next) {
    res.locals.isAdmin = false;
    if(req.session && req.session.userLogged) {
        if (req.session.userLogged == "admin@gmail.com") {
            res.locals.isAdmin = true;
        }
    };
    next();
};
module.exports = adminLoggedMiddleware;