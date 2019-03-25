const express = require('express');
const router = express.Router();

const smartTable = require('../../sensors/SmartTable');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./sensors-details/smart-table', { smartTable: smartTable });
    }else {
        res.send(smartTable);
    }
});

module.exports = router;
