const express = require('express');
const router = express.Router();

const Users = require('../models/Users');

router.post('/', (req, res) => {
    const data = JSON.stringify(req.body);
    const parsedData = JSON.parse(data);

    // check if password is less than 5 chars
    if (parsedData.password.length < 5) {
        res.send({ error: true, errorMessage: 'Password must be at least 5 characters' });
        return;
    }

    // first check if user with that email already present
    Users.findOne({ email: parsedData.email })
        .then((user) => {
            if (user) {
                res.send({ error: true, errorMessage: 'An account with this email ' + parsedData.email + ' already exists' });
            } else {
                const newUser = new Users({
                    name: parsedData.name,
                    email: parsedData.email,
                    password: parsedData.password,
                    role: 'customer',
                });

                newUser.save()
                    .then((savedUser) => {
                        console.log('User saved:', savedUser);
                        res.send({ error: false, errorMessage: '' });
                    })
                    .catch((error) => {
                        // Handle the error...
                        console.error('Error saving user:', error);
                        res.send({ error: true, errorMessage: 'Error saving user.' });
                    });
            }
        })
        .catch((error) => {
            console.error('Failed to check user with the given email');
            res.send({ error: true, errorMessage: 'Failed to create account.' });
        });

})

module.exports = router;