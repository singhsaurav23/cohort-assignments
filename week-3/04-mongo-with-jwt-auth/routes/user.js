const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;

        const newUser = new User({
            username: username,
            password: password
        });

        await newUser.save();
        res.status(200).send('User created successfully');
    } catch (err) {
        res.status(500).send('Internal error');
    }
});

router.post('/signin', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let val = await User.findOne({
        username,
        password
    });
    if (val) {
        const token = await jwt.sign(password, 'secret');
        res.status(200).send(token);
    }
    else {
        res.status(404).send('User does not exist');
    }
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({});

    res.status(200).send(response);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const token = req.headers.token;
    const users = await User.find({}, '-username');
    let password;

   console.log(users)
    for (let i = 0; i < users.length; i++) {
        if (jwt.sign(users[i].password, 'secret') == token)
            password = users[i].password;
    }

    try {
        await User.updateOne(({
            password
        }, {
            "$push": {
                purchasedCourses: req.params.courseId
            }
        }));

        res.status(200).json({
            msg: "Course purchased successfully"
        })
    } catch (err) {
        res.status(500).send('Internal error');
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const token = req.headers.token;
    const users = await User.find({});
    let password;
    const parts = token.split(' ');

    // Extract the token (assuming the format is "Bearer <actual_token>")
    const tokens = parts.length === 2 ? parts[1] : null;

    console.log(tokens);
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].password)
        let tok = jwt.sign(users[i].password, 'secret');
        console.log(tok)
        if ( tok == tokens) {
            password = users[i].username;
        }
           
    }
    const user = await User.findOne({
        username:password
    })
    console.log(user)

    const coursesPurchased = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        coursesPurchased
    })
});

module.exports = router