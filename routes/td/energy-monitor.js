const express = require('express');
const router = express.Router();

const energyMonitor = require('../../sensors/EnergyMonitor');


router.get('/', function(req, res, next) {
    res.send(energyMonitor);
});

module.exports = router;
