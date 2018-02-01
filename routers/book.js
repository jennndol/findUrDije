const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) =>{
  models.findById(req.params.id).then(dataSeeker =>{
    res.render('book', {title: Book,
      dataSeeker: dataSeeker,
      session: req.session.username})
  })
})



module.exports = router
