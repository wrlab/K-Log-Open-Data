const express = require('express');
const router = express.Router();

const airQuality = require('../sensors/AirQuality');
const cushion = require('../sensors/Cushion');
const energyApplianceMonitor = require('../sensors/EnergyApplianceMonitor');
const energyMonitor = require('../sensors/EnergyMonitor');
const ipCamera = require('../sensors/IPCamera');
const ipfsCamera = require('../sensors/IPFSCamera');
const sleep = require('../sensors/Sleep');
const smartTable = require('../sensors/SmartTable');
const smartWatch = require('../sensors/SmartWatch');

const utils = require('../utils/thing-description');

router.get('/', function(req, res, next) {
  const things  = {airQuality, cushion, energyApplianceMonitor, energyMonitor,
    ipCamera, ipfsCamera, sleep, smartTable, smartWatch};

  for (let key in things) {
    if (things.hasOwnProperty(key)) {
      things[key] = utils.addDefaultValues(things[key]);
    }
  }

  if (req.accepts('text/html')) {
    res.render('index', { things: things });
  } else {
    res.send(things);
  }
});

module.exports = router;