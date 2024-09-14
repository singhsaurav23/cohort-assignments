const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://srvs29:Adirav%402000@cluster0.wgtiw0s.mongodb.net/')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    Account
}