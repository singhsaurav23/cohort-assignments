const express = require("express");
const { authmiddleware } = require('./middleware');
const { Account } = require('../db');
const { z } = require('zod');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance', authmiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})

const transferBody = z.object({
    to: z.string(),
    amount: z.number()
})


router.post('/transfer', authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        transferBody.parse(req.body);
        const { to, amount } = req.body;  
        console.log(to)
      console.log(amount)
        const account = await Account.findOne({
            userId: req.userId
        }).session(session);
        if (!account || account.balance < amount || amount <=0 ) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balanace"
            })
        }
        const toAccount = await Account.findOne({
            userId: to
        }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })

    }
    catch (err) {
        await session.abortTransaction();
        res.status(403).json({
            message: "Failed"
        });
    }
})



module.exports = router;