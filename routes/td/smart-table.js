const express = require('express');
const router = express.Router();

const smartTable = require('../../sensors/SmartTable');


router.get('/', function(req, res, next) {
    res.send(smartTable);
});

module.exports = router;
