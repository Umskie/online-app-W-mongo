const express = require('express');
const router = express.Router();
const { expressjwt } = require('express-jwt');
const secretKey = require('../key');
const mongoose = require('mongoose');


const Order = require('../models/Order');

router.post('/', expressjwt({ secret: secretKey, algorithms: ['HS256'] }), (req, res) => {
    const data = req.body;
    const userId = req.auth.id;

    const modifiedData = data.map((doc) => {
        return {
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(doc.productId),
            quantity: doc.quantity,
            totalPrice: doc.price,
            status: 'ORDERED'
        };
    });

    Order.insertMany(modifiedData).then(result => {
        console.log(result);
        res.json({ error: false, errorMessage: '' });
    }).catch(err => {
        res.json({ error: true, errorMessage: 'Failed to place order. Server Error. Please try again later' });
    })

})



router.get('/getorders', expressjwt({ secret: secretKey, algorithms: ['HS256'] }), async (req, res) => {
    const userId = req.auth.id;

    const results = await Order.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 0,
                orderId: "$_id",
                productName: "$productDetails.name",
                image: "$productDetails.image",
                totalPrice: "$totalPrice",
                quantity: "$quantity",
                status: "$status",
                createdAt: "$createdAt",
            }
        }
    ]);

    if (!results) {
        res.json({ error: true, errorMessage: 'Failed to get orders. Server Error' });
        return;
    }

    res.json({ error: false, errorMessage: '', data: results });



})

module.exports = router;