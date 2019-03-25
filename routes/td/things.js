const express = require('express');
const router = express.Router();

const airQuality = require('../../sensors/AirQuality');
const cushion = require('../../sensors/Cushion');
const energyApplianceMonitor = require('../../sensors/EnergyApplianceMonitor');
const energyMonitor = require('../../sensors/EnergyMonitor');
const ipCamera = require('../../sensors/IPCamera');
const ipIPFSCamera = require('../../sensors/IPFSCamera');
const sleep = require('../../sensors/Sleep');
const smartTable = require('../../sensors/SmartTable');
const smartWatch = require('../../sensors/SmartWatch');


router.get('/', function(req, res, next) {
    res.send([airQuality, cushion, energyApplianceMonitor, energyMonitor,
    ipCamera, ipIPFSCamera, sleep, smartTable, smartWatch]);
});

module.exports = router;
