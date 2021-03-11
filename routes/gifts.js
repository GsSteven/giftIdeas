const express = require('express');
const router = express.Router();
const Friend = require('./../models/Friend');

router.post('', (req, res) => {
    const data = req.body.data;
    const newGift = {
        item: data.item,
        description: data.description,
        price: data.price,
        link: data.link
    };

    Friend.findById(data.id)
        .then(response => {
            const currentGifts = response.gifts;
            currentGifts.push(newGift);
            return response.set(currentGifts);
        })
        .then(result => {
            result.save();
            res.status(200).send();
        })
        .catch(error => {
            res.status(400).send();
        });
});

router.put('', (req, res) => {
    const params = req.body.params;
    const idOfFriend = params.id;
    const indexToDelete = params.index;
    Friend.findById(idOfFriend)
        .then(response => {
            const currentGifts = response.gifts;
            currentGifts.splice(indexToDelete, 1);
            return response.set(currentGifts);
        })
        .then(result => {
            result.save();
            res.status(200).send();
        })
        .catch(error => {
            res.status(400).send();
        });
});




module.exports = router;