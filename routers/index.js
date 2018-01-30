const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) =>{
  models.User.findOne({
  where: {username: req.params.username},
  attributes: ['id', 'username', 'TypeId']})
  .then(data => {
    models.Type.findById(data.TypeId)
    .then(type => {
      if(type.name == 'DJ'){
        models.DJ.findOne({where: {UserId: data.id} })
        .then(dataDj =>{
          res.render('profile/profileDJ', {title: 'Profile', dataDj: dataDj, username: data.username})
        })
      }else{
        models.DJSeeker.findOne({where: {UserId: data.id} })
        .then(dataSeeker =>{
          res.render('profile/profileSeeker', {title: 'Profile', dataSeeker: dataSeeker, username: data.username})
        })
      }
    })
  }).catch(err =>{res.send(err)})
})

router.get('/:username/edit', (req, res) =>{
  models.User.findOne({
  where: {username: req.params.username},
  attributes: ['id', 'username', 'TypeId']})
  .then(data => {
    models.Type.findById(data.TypeId)
    .then(type => {
      if(type.name == 'DJ'){
        models.DJ.findOne({where: {UserId: data.id} })
        .then(dataDj =>{
          res.render('profile/editProfileDJ', {title: 'Edit Profile', dataDj: dataDj, username: data.username})
        })
      }else{
        models.DJSeeker.findOne({where: {UserId: data.id} })
        .then(dataSeeker =>{
          res.render('profile/editProfileSeeker', {title: 'Edit Profile', dataSeeker: dataSeeker, username: data.username})
        })
      }
    })
  }).catch(err =>{res.send(err)})
})

router.post('/:username/edit', (req, res) =>{
  models.User.findOne({
  where: {username: req.params.username},
  attributes: ['id', 'username', 'TypeId']})
  .then(data => {
    models.Type.findById(data.TypeId)
    .then(type => {
      if(type.name == 'DJ'){
        let objDj = {
          name : req.body.name,
          phone : req.body.phone,
          address : req.body.address,
          detail : req.body.detail
        }
        models.DJ.update(objDj, {where: {UserId: data.id} })
        .then(dataDj =>{
          res.redirect(`/${req.params.username}`)
        })
      }else{
        let objSeeker = {
          name : req.body.name,
          phone : req.body.phone,
          address : req.body.address
        }
        models.DJSeeker.update(objSeeker, {where: {UserId: data.id} })
        .then(dataSeeker =>{
          res.redirect(`/${req.params.username}`)
        })
      }
    })
  }).catch(err =>{res.send(err)})
})


module.exports = router;
