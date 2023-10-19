const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    totalPrice: Number,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
