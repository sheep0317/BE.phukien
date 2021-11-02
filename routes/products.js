const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const db =require('../config/database')


router.get('/', (req, res) => {
    Product.findAll()
        .then(products => {
            console.log(products)
            res.sendStatus(200)
        })
     
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;