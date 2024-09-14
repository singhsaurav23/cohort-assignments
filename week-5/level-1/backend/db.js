const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srvs29:Adirav%402000@cluster0.wgtiw0s.mongodb.net/');

const cardSchema = mongoose.Schema({
    name: String,
    description: String,
    interests: [{
        type: String
    }],
    socials: [{
        type: String
    }]
});

const card = mongoose.model('cards', cardSchema);

module.exports = {
    card: card
}