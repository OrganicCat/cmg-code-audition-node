// Since I accidentally picked react to start with (poor choice for reading files) I'm going to solve the problems first


/*

For all results, grab list of values, date/times appear to be useless, discard them, set all remaining items for each "set" into a map styled object, loop through "keys" (therm1, therm2, etc.)

1) For a thermometer, it is branded “ultra precise” if the mean of the readings is within 0.5 degrees of the known temperature, and the standard
deviation is less than 3. It is branded “very precise” if the mean is within 0.5 degrees of the room, and the standard deviation is under 5. Otherwise,
it’s sold as “precise”.
-- one array, set base as ultra precise, if value dips between 3-5 set as very precise, if value ever exceeds 5 set as precise and stop run for this thermometer to speed things up o(log(n)) I believe

2) For a humidity sensor, it must be discarded unless it is within 1 humidity percent of the reference value for all readings. (All humidity sensor
readings are a decimal value representing percent moisture saturation.)
-- one array, set base as keep, if value exceeds 1 at any time, set as discard and stop loop

3) For a carbon monoxide detector, it must be discarded unless it is within 3 ppm of the reference value for all readings. (All carbon monoxide
readings are an integer value representing parts per million.)
-- one array, set base as keep, if value exceeds 3ppm set as discard stop loop through values


DOn't think I'll have time to parse data from file, so I'm faking it
*/

const tempRef = 70.0;
const humidityRef = 45.0;
const carbonMonoxideRef = 6;

const dataObject = {
    therms: [{
        name: "therm1",
        temps: [72.4, 76.0, 79.1, 75.6, 71.2, 71.4, 69.2, 65.2, 62.8, 61.4, 64.0, 67.5, 69.4]
    },
    {
        name: "therm2",
        temps: [70, 69, 70]
    },
    {
        name: "therm3",
        temps: [74, 74, 73, 70]
    }
    ],
    humidSensors: [{
        name: "humid1",
        humidity: [45.2, 45.33, 45.1, 45.1]
    },
    {
        name: "humid2",
        humidity: [45.1, 45.2, 44.1, 46.1]
    },
    {
        name: "humid3",
        humidity: [-1.2, 5, 404]
    }
    ],
    carbonMonoxideSensors: [{
        name: "mon-1",
        carbondMonValues: [3, 5, 4, 3, 3]
    },
    {
        name: "mon-2",
        carbondMonValues: [1, 3, 10, 4, 6]
    },
    {
        name: "mon-3",
        carbondMonValues: [5, 6, 5, 6]
    }
    ]
}

// assume input here of dataObject
const sortTemps = () => {
    const therms = dataObject.therms;
    const thermResult = [];

    therms.forEach((therm) => {
        let thermType = "ultra precise";
        let thermIndex = 0;

        while (thermType !== "precise" && thermIndex < therm.temps.length) {
            const absDiff = Math.abs(tempRef - therm.temps[thermIndex]);
            if (absDiff > 5) {
                thermType = "precise";
            } else if (absDiff <= 5 && absDiff >= 3) {
                thermType = "very precise";
            }
            thermIndex++;
        }

        thermResult.push([`${therm.name} ${thermType}`]);
    });

    console.log(thermResult);
    return thermResult;
}

const humidResult = () => {
    const sensors = dataObject.humidSensors;
    const humidResults = [];

    sensors.forEach((sensor) => {
        let humidType = "keep";
        let humidIndex = 0;

        while (humidType !== "discard" && humidIndex < sensor.humidity.length) {
            const absDiff = Math.abs(humidityRef - sensor.humidity[humidIndex]);
            if (absDiff > 1) {
                humidType = "discard";
            }
            humidIndex++;
        }

        humidResults.push([`${sensor.name} ${humidType}`]);
    });

    console.log(humidResults);
    return humidResults;
}

// This COULD be combined with the above function, HOWEVER it would introduce instability later if you added more types of requirements
// or values to compare against like thermometers have. Better to keep separate
const carbonMonoxideResult = () => {
    const carbonMonoxideSensors = dataObject.carbonMonoxideSensors;
    const carbondMonxideResults = [];

    carbonMonoxideSensors.forEach((carbonMonoxideSensor) => {
        let sensorType = "keep";
        let sensorIndex = 0;

        while (sensorType !== "discard" && sensorIndex < carbonMonoxideSensor.carbondMonValues.length) {
            const absDiff = Math.abs(carbonMonoxideRef - carbonMonoxideSensor.carbondMonValues[sensorIndex]);
            if (absDiff > 3) {
                sensorType = "discard";
            }
            sensorIndex++;
        }

        carbondMonxideResults.push([`${carbonMonoxideSensor.name} ${sensorType}`]);
    });

    console.log(carbondMonxideResults);
    return carbondMonxideResults;
}

exports.sortTemps = sortTemps;
exports.humidResult = humidResult;
exports.carbonMonoxideResult = carbonMonoxideResult;