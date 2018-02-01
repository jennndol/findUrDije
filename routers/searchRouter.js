const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('./search/index', {
    session: req.session.username
  });
});

module.exports = router;
