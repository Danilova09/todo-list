const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next(e);
    }
});

router.post('/',async (req, res, next) => {
    try {
        if (!req.body.username) {
            return res.status(400).send({error: 'Fill in username'});
        }
        const userData = {
            username: req.body.username,
        }

        const user = new User(userData);
        await user.save();
        return res.send({user: user});
    } catch (e) {
        console.log('error');
        next(e);
    }
});

module.exports = router;