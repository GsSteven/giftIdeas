const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend');

router.get('', (req, res) => {
    Friend.find({})
        .then(response => {
            res.status(200).send(response);
        });
});




module.exports = router;