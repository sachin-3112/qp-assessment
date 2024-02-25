const express = require('express');
const { login, create, createAdmin } = require('../Controllers/Auth.controller');
const router = express.Router();


router.post('/login', login);

router.post('/create', create);

router.post('/admin/create', createAdmin);

module.exports = router;
