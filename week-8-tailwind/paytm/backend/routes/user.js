const express = require("express");
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User, Account } = require("../db");
const { JWT_SECRET } = require('../config');
const { authmiddleware } = require('./middleware');

const signupSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.post('/signup', async (req, res) => {
    const body = req.body;
    const user = User.findOne({
        username: body.username
    })
    if (user._id) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }
    try {
        signupSchema.parse(body);
        const dbuser = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        await Account.create({
            userId: dbuser._id,
            balance: 1 + Math.random() * 10000
        })
        // Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        // Generate a token for the user
        const token = jwt.sign({ userId: dbuser._id }, JWT_SECRET);
        res.json({
            message: "USER CREATED SUCCESSFULLY",
            token: token
        })
    }
    catch (err) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
})

router.post('/signin', async (req, res) => {
    const body = req.body;
    try {
        signinBody.parse(body)
        const user = await User.findOne({
            username: body.username,
            password: body.password
        })
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            res.json({
                token: token
            })
            return;
        }
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    catch (err) {
        res.status(401).json({});
    }
})

router.get('/', authmiddleware, async (req, res) => {
    try {
       
        const user = await User.findOne({ _id: req.userId });
        res.json({
            user: user.firstName[0] + user.lastName[0]
        })
    }
    catch (err) {
        return res.status(411).json({
            message: "Failed"
        })
    }

})

router.put('/', authmiddleware, async (req, res) => {
    const body = req.body;
        try {
            updateBody.parse(body);
            await User.updateOne(req.body, {
                _id: req.userId
            });
            res.json({
                message: "Updated successfully"
            })
        }
        catch (err) {
            return res.status(411).json({
                message: "Failed"
            })
        }
})

router.get('/bulk', authmiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": new RegExp(filter, 'i')
            }
        }, {
            lastName: {
                "$regex": new RegExp(filter, 'i')
            }
        }]
    })
    res.json({
        user: users.filter(user => user._id.toString() !== req.userId).map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;