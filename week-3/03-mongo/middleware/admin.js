const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;
    let val = await Admin.findOne({
        username,
        password
    });
    if (val) next();
    else {
        res.status(404).send('Admin does not exist');
    }
}

module.exports = adminMiddleware;