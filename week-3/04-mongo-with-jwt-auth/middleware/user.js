const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

function userMiddleware(req, res, next) {
    let token = req.headers.token;
    const parts = token.split(' ');

    // Extract the token (assuming the format is "Bearer <actual_token>")
    const tokens = parts.length === 2 ? parts[1] : null;

    console.log(tokens);
    try {
        jwt.verify(tokens, jwtPassword);
        next();
    }
    catch {
        res.status(404).send('Invalid user');
    }
}

module.exports = userMiddleware;