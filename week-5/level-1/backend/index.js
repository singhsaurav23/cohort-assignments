const express = require('express')
const app = express();
const { card } = require('./db');

const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

const PORT = 3000;

app.post('/cards', async (req, res) => {
    try {
        await card.create({
            name: req.body.name,
            description: req.body.description,
            interests: req.body.interests,
            socials: req.body.socials
        });
        res.status(200).send('Added Card');
    }
    catch {
        res.status(411).send({
            msg: "You sent the wrong input"
        });
    }
})

app.get('/cards', async (req, res) => {
    const cards = await card.find({});
    res.json({
        cards
    });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});