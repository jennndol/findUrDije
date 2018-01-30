const express = require('express');
const router = express.Router();
const models = require('../models');
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', (req, res) => {
  models.Event.findAll({
      where: {
        DJSeekerId: req.session.UserId
      },
      include: [models.DJSeeker, models.DJ]
    })
    .then(events => {
      res.send(events);
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/add', (req, res) => {
  res.render('./event/add', {
    title: 'Add New Event'
  });
});

router.post('/add', (req, res) => {
  let obj = {
    name: req.body.name,
    detail: req.body.detail,
    date: req.body.date,
    DJSeekerId: req.body.DJSeekerId
  };
  models.Event.create(obj)
    .then(row => {
      res.send(row)
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/edit/:id', (req, res) => {
  models.Event.findById(req.params.id)
    .then(event => {
      res.render('./event/edit', {
        event: event
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
    date: req.body.date,
    DJSeekerId: req.body.DJSeekerId
  };
  models.Event.update(obj, {
      where: {
        id: req.params.id
      }
    })
    .then((affectedRowTotal) => {
      console.log(affectedRowTotal);
      res.send(`${affectedRowTotal} record terubah`);
    })
    .catch(error => {
      res.send(error);
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
      res.send(events);
    }).catch(error => {
      res.send(error);
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
            DJs: DJs
          });
        })
        .catch();
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/:id/assign', (req, res) => {
  let obj = {
    EventId: req.body.EventId,
    DJId: req.body.DJId
  };
  models.Book.create(obj)
  .then(affectedRow => {
    console.log(affectedRow);
    res.redirect(`/events/${affectedRow.EventId}`);
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;
