const jwt = require('jsonwebtoken');

// Middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
    // Extract the token from the cookies
    const token = req.cookies.token;

    // If no token is found, deny access with a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided' });
    }
    
    // Verify the token using the JWT_SECRET from environment variables
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        // If verification fails, return a 403 Forbidden response
        if (error) {
            return res.status(403).json({ meta: { success: false, status: 404, msg: 'Invalid Token' } });
        }
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;
