const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../key');


const Users = require('../models/Users');

router.post('/', (req, res) => {
    const data = JSON.stringify(req.body);
    const parsedData = JSON.parse(data);
    Users.findOne({ $and: [{ email: parsedData.email }, { password: parsedData.password }] }).select('-password').then(user => {
        if (user) {
            const payload = {
                id: user.id
            }
            const token = jwt.sign(payload, secretKey);
            res.json({ error: false, errorMessage: '', token: token, user: user });
        } else {
            res.json({ error: true, errorMessage: 'Invalid Email or Password' });
        }
    })

})

module.exports = router;