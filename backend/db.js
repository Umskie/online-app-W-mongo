const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/onlineshopping'; // Replace with your database connection URL

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db;
