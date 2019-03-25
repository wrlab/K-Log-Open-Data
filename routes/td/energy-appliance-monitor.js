const express = require('express');
const router = express.Router();

const energyApplianceMonitor = require('../../sensors/EnergyApplianceMonitor');


router.get('/', function(req, res, next) {
    res.send(energyApplianceMonitor);
});

module.exports = router;
