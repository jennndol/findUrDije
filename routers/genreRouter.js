const express = require('express');
const router = express.Router();
const models = require('../models');
const sessionChecker = require('../helpers/sessionChecker');

router.get('/', sessionChecker,(req, res) => {
  models.Genre.findAll()
    .then(genres => {
      res.render('./genre/index', {
        genres: genres,
        session: req.session.username,
        isDJ: req.session.isDJ
      });
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/add',sessionChecker, (req, res) => {
  res.render('./genre/add', {
    title: 'Add New Genre',
    session: req.session.username,
    isDJ: req.session.isDJ
  });
});

router.post('/add', sessionChecker,(req, res) => {
  models.Genre.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name
      }
    })
    .spread((genre, isCreated) => {
      isCreated ? res.send(`${genre.name} telah berhasil disimpan`) : res.send(`${genre.name} sudah ada`);
    });
});

router.get('/edit/:id',sessionChecker, (req, res) => {
  models.Genre.findById(req.params.id)
    .then(genre => {
      res.render('./genre/edit', {
        genre: genre,
        session: req.session.username,
        isDJ: req.session.isDJ
      });
    })
    .catch(error => {
      res.send(error);
    });
});

router.post('/edit/:id', sessionChecker,(req, res) => {
  models.Genre.findAll({
      where: {
        name: req.body.name
      }
    })
    .then((foundGenres) => {
      if (foundGenres.length === 0) {
        models.Genre.update(req.body, {
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
      } else {
        res.send('Genre sudah ada');
      }
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/delete/:id', sessionChecker,(req, res) => {
  models.Genre.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((affectedRowTotal) => {
      console.log(affectedRowTotal);
      return models.Genre.findAll();
    })
    .then(genres => {
      res.send(genres);
    }).catch(error => {
      res.send(error);
    });
});

module.exports = router;
