const express = require('express');
const router = express.Router();

const smartTable = require('../../sensors/SmartTable');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: smartTable });
    }else {
        res.send(smartTable);
    }
});

module.exports = router;
