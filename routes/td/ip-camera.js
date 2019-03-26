const express = require('express');
const router = express.Router();

const ipCamera = require('../../sensors/IPCamera');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: ipCamera });
    }else {
        res.send(ipCamera);
    }
});

module.exports = router;
