var express = require('express');
var equipment = require('../my-code/equipment');
var router = express.Router();

// Let's see how much file reading I have time to do
const readline = require('readline');
const fs = require('fs');
const path = require('path');


const readInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve('./my-code/datafile.txt')),
  output: process.stdout,
  console: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  readInterface.on('line', function(line) {
    console.log(line);
  });

  let thermometers = equipment.sortTemps();
  let humidity = equipment.humidResult();
  let carbonMonoxide = equipment.carbonMonoxideResult();
  res.render('index', { title: 'Express', thermometers, humidity, carbonMonoxide });
});

module.exports = router;
