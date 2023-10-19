const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId },
    image: String
});

module.exports = mongoose.model('Products', productsSchema);
