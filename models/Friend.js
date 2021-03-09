const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//gifts Schema

const FriendSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    favCandy: {
        type: String
    },
    favColor: {
        type: String
    },
    gifts: {
        type: Array
    }
});

const Friend = mongoose.model("gifts", FriendSchema);

module.exports = Friend;

