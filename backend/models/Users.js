const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', usersSchema);
