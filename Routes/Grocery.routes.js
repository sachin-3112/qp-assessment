const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProducts } = require('../Controllers/Grocery.controller');
const router = express.Router();

router.post('/', addProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProducts);



module.exports = router;
