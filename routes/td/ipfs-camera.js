const express = require('express');
const router = express.Router();

const ipfsCamera = require('../../sensors/IPFSCamera');


router.get('/', function(req, res, next) {
    if (req.accepts('text/html')) {
        res.render('./sensors-details/ipfs-camera', { ipfsCamera: ipfsCamera });
    }else {
        res.send(ipfsCamera);;
    }
});

module.exports = router;
