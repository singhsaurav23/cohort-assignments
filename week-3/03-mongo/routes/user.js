const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

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

router.get('/courses', async (req, res) => {
    const response = await Course.find({});

    res.status(200).json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    console.log(courseId);
    try { 
        await User.updateOne(({
            username
        }, {
            "$push": {
                purchasedCourses: courseId
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
    const user = await User.findOne({
        username: req.headers.username
    })


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