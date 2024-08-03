const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided' });
    }
    
    
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ meta: { success: false, status: 404, msg: 'Invalid Token' } });
        }
        req.user = decoded;
        next();
    });
    
};

module.exports = verifyToken;
