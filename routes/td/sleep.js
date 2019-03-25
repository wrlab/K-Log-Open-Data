const express = require('express');
const router = express.Router();

const sleep = require('../../sensors/Sleep');


router.get('/', function(req, res, next) {
    res.send(sleep);
});

module.exports = router;
