const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;

        const newAdmin = new Admin({
            username: username,
            password: password
        });

        await newAdmin.save();
        res.status(200).send('Admin created successfully');
    } catch (err) {
        res.status(500).send('Internal error');
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        // Implement course creation logic
        const courseTitle = req.body.title;
        const courseDescription = req.body.description;
        const coursePrice = req.body.price;
        const courseImageLink = req.body.imageLink;

        const newCourse = new Course({
            title: courseTitle,
            description: courseDescription,
            price: coursePrice,
            imageLink: courseImageLink
        });

        await newCourse.save();

        res.status(200).json({
            msg: "Course created successfully",
            courseId: newCourse._id
        });
    } catch (error) {
        res.status(500).send('Internal error');
    }
});


router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});

    res.json({
        courses: response
    })

});

module.exports = router;