const express = require('express');
const router = express.Router();

const energyApplianceMonitor = require('../../sensors/EnergyApplianceMonitor');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: energyApplianceMonitor });

    }else {
        res.send(energyApplianceMonitor);
    }
});

module.exports = router;
