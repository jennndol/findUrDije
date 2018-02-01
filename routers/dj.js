const models = require('../models');
const express = require('express');
const router = express.Router();
const sessionChecker = require('../helpers/sessionChecker');

router.get('/',sessionChecker, (req, res) =>{
  models.DJ.findAll({
    include: [models.User]
  }).then(dataDj =>{
    res.render('dj/dj', {title:'List DJ', dataDj: dataDj, session: req.session.username, isDJ: req.session.isDJ})
  }).catch(err =>{console.log(err)})
})

router.get('/add', sessionChecker,(req, res) =>{
  models.DJ.findAll().then(dataDj =>{
    res.render('dj/addDj', {title:'Add DJ', dataDj: dataDj, session: req.session.username, isDJ: req.session.isDJ})
  }).catch(err =>{console.log(err)})
})

router.post('/add', (req, res) =>{
  let objDj = {
    name : req.body.name,
    phone : req.body.phone,
    address : req.body.address,
    detail : req.body.detail
  }
  models.DJ.create(objDj).then(dataDj =>{
    res.redirect('/djs')
  })
})

router.get('/edit/:id', sessionChecker,(req, res) =>{
  models.DJ.findById(req.params.id).then(dataDj =>{
    res.render('dj/editDj', {title: 'Edit DJ', dataDj: dataDj, session: req.session.username, isDJ: req.session.isDJ})
  }).catch(err => {console.log(err);})
})

router.post('/edit/:id', sessionChecker,(req, res) =>{
  let objDj = {
    name : req.body.name,
    phone : req.body.phone,
    address : req.body.address,
    detail : req.body.detail
  }
  models.DJ.update(objDj, {where: {id: req.params.id}}).then(dataDj =>{
    res.redirect('/djs')
  })
})

router.post('delete/:id', sessionChecker,(req, res) =>{
  models.DJ.destroy(req.params.id).then(dataDj =>{
    res.redirect('/djs')
  })
})

module.exports = router;
