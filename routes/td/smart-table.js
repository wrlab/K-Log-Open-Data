const express = require('express');
const router = express.Router();

const smartTable = require('../../sensors/SmartTable');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(smartTable), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(smartTable));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(smartTable);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(smartTable).properties[property]);
    }
});

module.exports = router;
