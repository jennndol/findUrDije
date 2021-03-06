const models = require('../models');
const express = require('express');
const router = express.Router();
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', (req, res) => {
  res.redirect('/auth/login')
})

router.get('/:username', sessionChecker, (req, res) => {
  models.User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['id', 'username', 'TypeId']
    })
    .then(data => {
      models.Type.findById(data.TypeId)
        .then(type => {
          if (type.name == 'DJ') {
            models.DJ.findOne({
                where: {
                  UserId: data.id
                }
              })
              .then(dataDj => {
                res.render('profile/profileDJ', {
                  title: 'Profile',
                  dataDj: dataDj,
                  username: data.username,
                  session: req.session.username,
                  isDJ: req.session.isDJ
                })
              })
          } else {
            models.DJSeeker.findOne({
                where: {
                  UserId: data.id
                }
              })
              .then(dataSeeker => {
                res.render('profile/profileSeeker', {
                  title: 'Profile',
                  dataSeeker: dataSeeker,
                  username: data.username,
                  session: req.session.username,
                  isDJ: req.session.isDJ
                })
              })
          }
        })
    }).catch(err => {
      res.send('ERROR 404');
    })
})

router.get('/:username/edit', sessionChecker, (req, res) => {
  models.User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['id', 'username', 'TypeId']
    })
    .then(data => {
      models.Type.findById(data.TypeId)
        .then(type => {
          if (type.name == 'DJ') {
            models.DJ.findOne({
                where: {
                  UserId: data.id
                }
              })
              .then(dataDj => {
                res.render('profile/editProfileDJ', {
                  title: 'Edit Profile',
                  dataDj: dataDj,
                  username: data.username,
                  session: req.session.username,
                  isDJ: req.session.isDJ,
                  errorMessage: req.flash().errorMessage,
                  successMessage: req.flash().successMessage
                })
              })
          } else {
            models.DJSeeker.findOne({
                where: {
                  UserId: data.id
                }
              })
              .then(dataSeeker => {
                res.render('profile/editProfileSeeker', {
                  title: 'Edit Profile',
                  dataSeeker: dataSeeker,
                  username: data.username,
                  session: req.session.username,
                  isDJ: req.session.isDJ,
                  errorMessage: req.flash().errorMessage,
                  successMessage: req.flash().successMessage
                })
              })
          }
        })
    }).catch(err => {
      res.send('ERROR 404')
    })
})

router.post('/:username/edit', sessionChecker, (req, res) => {
  models.User.findOne({
      where: {
        username: req.params.username
      },
      attributes: ['id', 'username', 'TypeId']
    })
    .then(data => {
      models.Type.findById(data.TypeId)
        .then(type => {
          if (type.name == 'DJ') {
            let objDj = {
              name: req.body.name,
              phone: req.body.phone,
              address: req.body.address,
              detail: req.body.detail
            }
            models.DJ.update(objDj, {
                where: {
                  UserId: data.id
                }
              })
              .then(dataDj => {
                req.flash('successMessage', 'Berhasil mengubah profil');
                res.redirect(`/${req.params.username}/edit`)
              })
              .catch(error => {
                req.flash('errorMessage', error.message);
                res.redirect(`/${req.params.username}/edit`);
              });
          } else {
            let objSeeker = {
              name: req.body.name,
              phone: req.body.phone,
              address: req.body.address
            }
            models.DJSeeker.update(objSeeker, {
                where: {
                  UserId: data.id
                }
              })
              .then(dataSeeker => {
                req.flash('successMessage', 'Berhasil mengubah profil');
                res.redirect(`/${req.params.username}/edit`)
              })
              .catch(error => {
                req.flash('errorMessage', error.message);
                res.redirect(`/${req.params.username}/edit`)
              });
          }
        })
    }).catch(err => {
      res.send('ERROR 404');
    })
})

module.exports = router;
