const express = require('express');
const router = express.Router();

const sleep = require('../../sensors/Sleep');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(sleep), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(sleep));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(sleep);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(sleep).properties[property]);
    }
});

module.exports = router;
