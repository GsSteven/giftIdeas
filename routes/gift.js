const express = require('express');
const router = express.Router();
const Gift = require('./../models/Gift');

router.get('', (req, res) => {
    Gift.find({})
        .then(response => {
            res.status(200).send(response);
        });
});




module.exports = router;