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
    const things  = {airQuality, cushion, energyApplianceMonitor, energyMonitor,
        ipCamera, ipIPFSCamera, sleep, smartTable, smartWatch};

    if (req.accepts('text/html')) {
        res.render('things', { things: things });
    } else {
        res.send(things);
    }
});

module.exports = router;
