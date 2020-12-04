var express = require('express');
var equipment = require('../my-code/equipment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let thermometers = equipment.sortTemps();
  let humidity = equipment.humidResult();
  let carbonMonoxide = equipment.carbonMonoxideResult();
  res.render('index', { title: 'Express', thermometers, humidity, carbonMonoxide });
});

module.exports = router;
