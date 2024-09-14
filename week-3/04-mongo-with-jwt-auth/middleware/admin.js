const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        jwt.verify(token, jwtPassword);
        next ();
    }
    catch {
        res.status(404).send('Invalid admin');
    }
}

module.exports = adminMiddleware;