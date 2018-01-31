const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  console.log('masukkkk');
  res.send(req.params)
})

module.exports = router;
