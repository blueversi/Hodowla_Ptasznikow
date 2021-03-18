var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { navLocation: 'main', title: 'Hodowla Ptaszników' });
});

module.exports = router;
