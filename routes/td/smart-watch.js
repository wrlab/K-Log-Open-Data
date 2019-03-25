const express = require('express');
const router = express.Router();

const smartWatch = require('../../sensors/SmartWatch');


router.get('/', function(req, res, next) {
    res.send(smartWatch);
});

module.exports = router;
