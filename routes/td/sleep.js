const express = require('express');
const router = express.Router();

const sleep = require('../../sensors/Sleep');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./thing-details', { model: sleep });
    }else {
        res.send(sleep);
    }
});

module.exports = router;
