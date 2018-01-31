const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');
const loginChecker = require('../helpers/loginChecker');

router.get('/register', loginChecker, (req, res) => {
  models.Type.findAll()
    .then(types => {
      res.render('./auth/register', {
        title: 'Register',
        types: types
      });
    })
    .catch(err => {
      res.send(error)
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
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/login', loginChecker, (req, res) => {
  res.render('./auth/login', {
    title: 'Login'
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
          req.session.isLoggedIn = result;
          req.session.UserId = user.id;
          req.session.username = user.username;
          req.session.email = user.email;
          req.session.TypeId = user.TypeId;
          res.redirect('/events');
          console.log(req.session);
        } else {
          res.redirect('/auth/login');
        }
      });
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/logout', loginChecker, (req, res) => {
  req.session.destroy(error => {
    error ? res.send(error) : res.redirect('/auth/login');
  })
});

module.exports = router;
