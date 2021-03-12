const { response } = require('express');
const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend');

router.get('', (req, res) => {
    Friend.find({})
        .then(response => {
            res.status(200).send(response);
        });
});

router.post('', (req, res) => {
    const data = req.body.data.payLoad;
    const newFriend = new Friend({
        name: data.name,
        birthday: data.birthday,
        favoriteColor: data.favoriteColor,
        favoriteCandy: data.favoriteCandy,
        gifts: []
    });
    newFriend.save()
        .then(() => {
            res.status(200).send();
        })
        .catch(e => {
            console.log(e);
            res.status(400).send('error');
        });
});

router.put('', (req, res) => {
    const params = req.body.params;
    const idToUpdate = req.body.id;
    Friend.findById(idToUpdate)
        .then(response => {
            //update all values changed
            for (const param in params) {
                response[param] = params[param];
            }
            return response
        })
        .then(result => {
            result.save();
            res.status(200).send();
        })
        .catch(error => {
            res.status(400).send();
        });
});

router.delete('', (req, res) => {
    const idToDelete = req.query.id;
    Friend.findById(idToDelete)
        .then(response => {
            response.remove();
            res.status(200).send();
        })
        .catch(error => {
            response.status(400).send();
        });
});



module.exports = router;