const express = require('express');
const router = express.Router();

const energyMonitor = require('../../sensors/EnergyMonitor');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(energyMonitor), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(energyMonitor));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(energyMonitor);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(energyMonitor).properties[property]);
    }
});

module.exports = router;
