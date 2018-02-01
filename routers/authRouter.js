const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');
const loginChecker = require('../helpers/loginChecker');
const sessionChecker = require('../helpers/sessionChecker');
const djChecker = require('../helpers/djChecker');

router.get('/register', loginChecker, (req, res) => {
  models.Type.findAll()
    .then(types => {
      res.render('./auth/register', {
        title: 'Register',
        types: types,
        errorMessage: req.flash().errorMessage,
        successMessage: req.flash().successMessage,
        session: req.session.username
      });
    })
    .catch(err => {
      req.flash('errorMessage', 'Belum ada tipe pengguna untuk dipilih.');
      res.redirect('/auth/register');
    });
});

router.post('/register', loginChecker, (req, res) => {
  let obj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    TypeId: req.body.TypeId
  };

  models.User.create(obj)
    .then(user => {
      req.flash('successMessage', 'Anda telah berhasil membuat akun.');
      res.redirect('/auth/register');
    })
    .catch(error => {
      req.flash('errorMessage', error.message);
      res.redirect('/auth/register');
    });
});

router.get('/login', loginChecker, (req, res) => {
  res.render('./auth/login', {
    title: 'Login',
    errorMessage: req.flash().errorMessage,
    session: req.session.username
  });
});

router.post('/login', loginChecker, (req, res) => {
  models.User.findOne({
      where: {
        [Op.or]: [{
          email: req.body.email
        }, {
          username: req.body.email
        }]
      }
    })
    .then(user => {
      user.login(req.body.password, (result) => {
        if (result) {
          djChecker(user.TypeId, (isDJ) => {
            req.session.isLoggedIn = result;
            req.session.UserId = user.id;
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.TypeId = user.TypeId;
            req.session.isDJ = isDJ;
            console.log(req.session);
            res.redirect('/events');
          })
        } else {
          req.flash('errorMessage', 'username atau password salah');
          res.redirect('/auth/login');
        }
      });
    })
    .catch(error => {
      req.flash('errorMessage', 'username atau password salah');
      res.redirect('/auth/login');
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    error ? res.send(error) : res.redirect('/auth/login');
  })
});

module.exports = router;
