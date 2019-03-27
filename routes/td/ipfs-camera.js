const express = require('express');
const router = express.Router();

const ipfsCamera = require('../../sensors/IPFSCamera');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: utils.addDefaultValues(ipfsCamera), baseUrl: req.baseUrl });
    }else {
        res.send(utils.addDefaultValues(ipfsCamera));
    }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(ipfsCamera);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(ipfsCamera).properties[property]);
    }
});

module.exports = router;
