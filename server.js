require('dotenv').config;
import { express, bodyParser } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

//imported routes


//mongoDB connect
mongoose.connect(MONGO_URI || 'mongodb://localhost/prints', {
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