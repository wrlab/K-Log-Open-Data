const express = require('express');
const router = express.Router();

const ipCamera = require('../../sensors/IPCamera');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(ipCamera), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(ipCamera));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(ipCamera);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(ipCamera).properties[property]);
    }
});

module.exports = router;
