const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'your_jwt_secret'); // Get token after "Bearer"
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired, please login again.');
        }
        return res.status(400).send('Invalid token.');
    }
};
