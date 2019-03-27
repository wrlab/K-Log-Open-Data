const express = require('express');
const router = express.Router();

const smartWatch = require('../../sensors/SmartWatch');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(smartWatch) , baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(smartWatch));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(smartWatch);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(smartWatch).properties[property]);
    }
});

module.exports = router;
