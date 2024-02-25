const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send('User Route');
});

router.put('/:id', (req, res) => {
  res.send('User Route');
});



module.exports = router;
