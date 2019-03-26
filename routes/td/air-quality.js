const express = require('express');
const router = express.Router();

const airQuality = require('../../sensors/AirQuality');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: airQuality });
    }else {
        res.send(airQuality);
    }
});

module.exports = router;
