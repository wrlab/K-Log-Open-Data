const express = require('express');
const router = express.Router();

const cushion = require('../../sensors/Cushion');


router.get('/', function(req, res, next) {
    res.send(cushion);
});

module.exports = router;
