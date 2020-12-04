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

const bindData = (dataObject, line) => {
  const lineData = line.split(" ");
  switch (lineData[0]) {
    case 'reference':
      dataObject.referenceData = {
        tempRef: lineData[1] || null,
        humidityRef: lineData[2] || null,
        carbonMonoxideRef: lineData[3] || null
      }
      break;
    case 'thermometer':
      // If we assume each thermometer name is unique we can do this, otherwise, we gotta create unique names
      dataObject.therms[lineData[1]] = [];
      //currentSensor = 
      break;
    case 'humidity':
      break;
    case 'monoxide':
      break;
    default:
      dataObject[currentSensor].push(lineData[1]);
  }
}

router.get('/', function(req, res, next) {
  const dataObject = {};
  const currentSensor = "none";
  readInterface.on('line', function(line) {
    console.log(line);
  });

  // The eventualality would be to read each line, constructing an object, and pass it to equipment
  // Ran out of time (I did this last), but have working prototype with how I would structure the object
  // on the next page, and how I would deal with large data sets or files given enough time as well

  // Ideally, the equipment file would only handle input data, not read data, and there would be one
  // function to process it not three. Although three could be handy if we wanted to check smaller datasets like
  // just therms, or just co2

  let thermometers = equipment.sortTemps();
  let humidity = equipment.humidResult();
  let carbonMonoxide = equipment.carbonMonoxideResult();
  res.render('index', { title: 'Express', thermometers, humidity, carbonMonoxide });
});

module.exports = router;
