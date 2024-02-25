const express = require('express');
const { updateUser, getUsers, getUserCart, addToCart } = require('../Controllers/Users.controller');
const router = express.Router();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.put('/:id/cart', addToCart);

router.get('/:id/cart', getUserCart);

module.exports = router;
