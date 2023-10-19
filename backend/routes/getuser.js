const express = require('express');
const router = express.Router();
const { expressjwt } = require('express-jwt');
const secretKey = require('../key');


const Users = require('../models/Users');

router.get('/', expressjwt({ secret: secretKey, algorithms: ['HS256'] }), (req, res) => {
    const userId = req.auth.id;
    Users.findById(userId).select('-password').then(user => {
        if (user) {
            console.log(user);
            res.json({ error: false, errorMessage: '', data: user });
        } else {
            res.json({ error: true, errorMessage: 'User not found' });
        }
    })
})

module.exports = router;