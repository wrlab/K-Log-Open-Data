const express = require('express');
const router = express.Router();

const energyMonitor = require('../../sensors/EnergyMonitor');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: energyMonitor });
    }else {
        res.send(energyMonitor);
    }
});

module.exports = router;
