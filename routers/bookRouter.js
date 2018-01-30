const express = require('express');
const router = express.Router();
const models = require('../models');
const djChecker = require('../helpers/djChecker');
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', sessionChecker, (req, res) => {
  djChecker(req.session.TypeId, (isDJ) => {
    if (isDJ) {
      models.Book.findAll({
          where: {
            DJId: req.session.UserId
          },
          include: [models.Event]
        })
        .then(books => {
          res.send(books);
        })
        .catch(error => {
          res.send(error);
        })
    } else {
      res.redirect('/events');
    }
  })
});

router.get('/accept/:id', (req, res) => {
  
});

module.exports = router;
