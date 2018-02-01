const express = require('express');
const router = express.Router();
const models = require('../models');
const djChecker = require('../helpers/djChecker');
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', sessionChecker, (req, res) => {
  djChecker(req.session.TypeId, (isDJ) => {
    if (isDJ) {
      models.DJ.findOne({
          where: {
            UserId: req.session.UserId
          }
        })
        .then(dj => {
          models.Book.findAll({
              where: {
                DJId: dj.id
              },
              include: [models.Event]
            })
            .then(books => {
              console.log(books);
              res.render('./book/index', {
                title: 'Undangan',
                books: books,
                successMessage: req.flash().successMessage,
                errorMessage: req.flash().errorMessage,
                session: req.session.username,
                isDJ: req.session.isDJ
              })
            })
            .catch(error => {
              res.send(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      res.redirect('/events');
    }
  })
});

router.get('/accept/:id',sessionChecker, (req, res) => {
  models.Book.findById(req.params.id)
    .then(book => {
        book.isApproved = true;
        book.save()
        .then(row => {
          req.flash('successMessage', 'Anda telah menerima undangan')
          res.redirect('/books')
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/ignore/:id',sessionChecker, (req, res) => {
  models.Book.findById(req.params.id)
    .then(book => {
      book.isApproved = false;
      book.save()
        .then(row => {
          req.flash('errorMessage', 'Anda telah menolak undangan');
          res.redirect('/books');
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
