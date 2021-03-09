const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//gifts Schema

const GiftSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    holiday: {
        type: String
    },
    date: {
        type: Date
    },
    desc: {
        type: String
    },
    link: {
        type: String
    }
});

const Gift = mongoose.model("gifts", GiftSchema);

module.exports = Gift;

