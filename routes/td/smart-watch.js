const express = require('express');
const router = express.Router();

const smartWatch = require('../../sensors/SmartWatch');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: smartWatch });
    }else {
        res.send(smartWatch);
    }
});

module.exports = router;
