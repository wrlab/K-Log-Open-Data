const express = require('express');
const router = express.Router();

const ipCamera = require('../../sensors/IPCamera');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./sensors-details/ip', { ipCamera: ipCamera });
    }else {
        res.send(ipCamera);
    }
});

module.exports = router;
