const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//gifts Schema

const FriendSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    favoriteColor: {
        type: String
    },
    favoriteCandy: {
        type: String
    },
    gifts: {
        type: Array
    }
});

const Friend = mongoose.model("friends", FriendSchema);

module.exports = Friend;

