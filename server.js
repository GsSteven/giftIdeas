require('dotenv').config;
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

//imported routes
const giftRoute = require('./routes/gift');

//mongoDB connect
mongoose.connect(MONGO_URI || 'mongodb://localhost/giftIdeas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch(err => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log('connected to DB');
});

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use('/api/gifts', giftRoute);


//for production app
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});