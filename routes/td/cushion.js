const express = require('express');
const router = express.Router();

const cushion = require('../../sensors/Cushion');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(cushion), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(cushion));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(cushion);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(cushion).properties[property]);
    }
});

module.exports = router;
