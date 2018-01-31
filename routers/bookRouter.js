const express = require('express');
const router = express.Router();
const models = require('../models');
const djChecker = require('../helpers/djChecker');
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', sessionChecker, (req, res) => {
  djChecker(req.session.TypeId, (isDJ) => {
    if (isDJ) {
      models.DJ.findOne({where:{UserId: req.session.UserId}})
      .then(dj => {
        models.Book.findAll({
            where: {
              DJId: dj.id
            },
            include: [models.Event]
          })
          .then(books => {
            console.log(books);
            res.render('./book/index', {title: 'Undangan'})
          })
          .catch(error => {
            res.send(error);
          })
      })
      .catch(error => {
      });
    } else {
      res.redirect('/events');
    }
  })
});

router.get('/accept/:id', (req, res) => {

});

module.exports = router;
