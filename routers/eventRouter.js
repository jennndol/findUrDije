const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Event.findAll({
      include: [models.DJSeeker]
    })
    .then(events => {
      res.render('./event/index', {
        events: events
      });
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = router;
