const express = require('express');
const router = express.Router();

const products = require('../models/Products');

// send a limit of products from products collection for browsing
router.get('/', (req, res) => {

    products.find({}).limit(20).then((products) => {
        console.log('products served');
        res.json({ error: false, errorMessage: '', data: products });
    }).catch(err => {
        console.error('error in fetching products:', err);
        res.json({ error: true, errorMessage: 'failed to fetch products' });
    });
})

// send a limit of products from products collection based on search
router.get('/findproducts', async (req, res) => {
    let searchValue = (req.query.search).trim() || '';

    const results = await products.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $match: {
                $or: [
                    { name: { $regex: searchValue, $options: "i" } },
                    { "categoryDetails.name": { $regex: searchValue, $options: "i" } }
                ]
            }
        },
        {
            $limit: 20 // Specify the desired number of results to limit to
        }
    ]);
    if (!results) {
        res.json({ error: true, errorMessage: 'Failed to sesarch products. Server error' });
        return;
    }

    res.json({ error: false, errorMessage: '', data: results });
})

module.exports = router;