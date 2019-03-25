const express = require('express');
const router = express.Router();

const ipIPFSCamera = require('../../sensors/IPFSCamera');


router.get('/', function(req, res, next) {
    res.send(ipIPFSCamera);
});

module.exports = router;
