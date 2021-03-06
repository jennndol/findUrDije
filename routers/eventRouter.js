const express = require('express');
const router = express.Router();
const models = require('../models');
const sessionChecker = require('../helpers/sessionChecker');
const djChecker = require('../helpers/djChecker');
const moment = require('moment');

router.get('/', sessionChecker, (req, res) => {
  djChecker(req.session.TypeId, (isDJ) => {
    if (!isDJ) {
      models.DJSeeker.findOne({
          where: {
            UserId: req.session.UserId
          }
        })
        .then(djSeeker => {
          models.Event.findAll({
              where: {
                DJSeekerId: djSeeker.id
              },
              include: [models.DJSeeker]
            })
            .then(events => {
              res.render('./event/index', {
                events: events,
                title: 'Your Event List',
                session: req.session.username,
                isDJ: req.session.isDJ,
                successMessage: req.flash().successMessage
              });
            })
            .catch(error => {
              res.send(error);
            });
        })
        .catch(error => {
          res.send(error);
        })
    } else {
      res.redirect('/books');
    }
  })
});

router.get('/add', sessionChecker, (req, res) => {
  res.render('./event/add', {
    title: 'Add New Event',
    min: moment().format("YYYY-MM-DD"),
    isDJ: req.session.isDJ,
    session: req.session.username,
    errorMessage: req.flash().errorMessage
  });
});

router.post('/add', sessionChecker,(req, res) => {
  djChecker(req.session.TypeId, (isDJ) => {
    if (!isDJ) {
      models.DJSeeker.findOne({
          where: {
            UserId: req.session.UserId
          }
        })
        .then(djSeeker => {
          let obj = {
            name: req.body.name,
            detail: req.body.detail,
            date: req.body.date,
            DJSeekerId: djSeeker.id
          };
          models.Event.create(obj)
            .then(row => {
              req.flash('successMessage', 'berhasil menambahkan event');
              res.redirect('/events');
            })
            .catch(error => {
              req.flash('errorMessage', error.message);
              res.redirect('/events/add');
            });
        })
        .catch(error => {
          req.flash('errorMessage', error.message);
          res.redirect('/events/add');
        });
    } else {
      res.redirect('/books');
    }
  })
});

router.get('/edit/:id', sessionChecker, (req, res) => {
  models.Event.findById(req.params.id)
    .then(event => {
      res.render('./event/edit', {
        event: event,
        session: req.session.username,
        isDJ: req.session.isDJ,
        title: 'Edit Profile',
        min: moment().format("YYYY-MM-DD")
      });
    })
    .catch(error => {
      res.send(error);
    });
});

router.post('/edit/:id', (req, res) => {
  let obj = {
    name: req.body.name,
    detail: req.body.detail,
    date: req.body.date
  };
  models.Event.update(obj, {
      where: {
        id: req.params.id
      }
    })
    .then((affectedRowTotal) => {
      console.log(affectedRowTotal);
      req.flash('successMessage', `berhasil mengubah event`);
      res.redirect(`/events`)
    })
    .catch(error => {
      res.send(`Error 404`);
    });
});

router.get('/delete/:id', (req, res) => {
  models.Event.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((affectedRowTotal) => {
      console.log(affectedRowTotal);
      return models.Event.findAll();
    })
    .then(events => {
      req.flash('successMessage', `berhasil menghapus event`);
      res.redirect('/events')
    }).catch(error => {
      res.send('Error 404');
    });
});

router.get('/:id', (req, res) => {
  models.Event.findById(req.params.id, {
      include: [models.DJ]
    })
    .then(event => {
      models.DJ.findAll()
        .then(DJs => {
          res.render('./event/detail', {
            event: event,
            DJs: DJs,
            session: req.session.username,
            isDJ: req.session.isDJ,
            errorMessage: req.flash().errorMessage
          });
        })
        .catch(error => {
          res.send('ERROR 404');
        });
    })
    .catch(error => {
      res.send('ERROR 404');
    });
});

router.post('/:id/assign', (req, res) => {
  let obj = {
    EventId: req.body.EventId,
    DJId: req.body.DJId
  };
  models.Book.findOrCreate({
      where: obj,
      defaults: obj
    })
    .spread((book, isCreated) => {
      isCreated ? req.flash('successMessage', `Data telah berhasil disimpan`) : req.flash('errorMessage', `DJ sudah ada dalam list event anda`);
      res.redirect(`/events/${req.params.id}`);
    });
});

module.exports = router;
