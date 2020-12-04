var express = require('express');
var equipment = require('../my-code/equipment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  equipment();
  res.render('index', { title: 'Express' });
});

module.exports = router;
