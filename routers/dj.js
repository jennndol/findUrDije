const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  models.DJ.findAll().then(dataDj =>{
    res.render('dj/dj', {title:'List DJ', dataDj: dataDj})
  }).catch(err =>{console.log(err)})
})

router.get('/addDj', (req, res) =>{
  models.DJ.findAll().then(dataDj =>{
    res.render('dj/addDj', {title:'Add DJ', dataDj: dataDj})
  }).catch(err =>{console.log(err)})
})

router.post('/addDj', (req, res) =>{
  let objDj = {
    name : req.body.name,
    phone : req.body.phone,
    address : req.body.address,
    detail : req.body.detail
  }
  models.DJ.create(objDj).then(dataDj =>{
    res.redirect('/dj')
  })
})

router.get('/edit/:id', (req, res) =>{
  models.DJ.findById(req.params.id).then(dataDj =>{
    res.render('dj/editDj', {title: 'Edit DJ', dataDj: dataDj})
  }).catch(err => {console.log(err);})
})

router.post('/edit/:id', (req, res) =>{
  let objDj = {
    name : req.body.name,
    phone : req.body.phone,
    address : req.body.address,
    detail : req.body.detail
  }
  models.DJ.update(objDj, {where: {id: req.params.id}}).then(dataDj =>{
    res.redirect('/dj')
  })
})

router.post('delete/:id', (req, res) =>{
  models.DJ.destroy(req.params.id).then(dataDj =>{
    res.redirect('/dj')
  })
})

module.exports = router;
