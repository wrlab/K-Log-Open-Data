const express = require('express');
const router = express.Router();

const cushion = require('../../sensors/Cushion');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./sensors-details/cushion', { cushion: cushion });
    }else {
        res.send(cushion);
    }
});

module.exports = router;
