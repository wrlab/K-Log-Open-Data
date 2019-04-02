const path = require('path');
const fs = require("fs");

module.exports = function(options) {
    return function(req, res, next) {
        const uri = req.originalUrl;

        if(req.accepts('text/html')) {
            // handling the html requests
            var filename = uri + '.html';

            // handling the request for the home page (where the uri is '/')
            if(uri == '/') {
                filename = uri + 'index.html';
            }

            var fullpath = path.join(__dirname, '..', 'HTML_Files', filename);

        } else {
            // handling the html requests
            var filename = uri + '.jsonld';

            // handling the request for the home page (where the uri is '/')
            if(uri == '/') {
                filename = uri + 'index.jsonld';
            }

            var fullpath = path.join(__dirname, '..', 'JSONLD_Files', filename);
        }

        fs.exists(fullpath, function(exists) {
            if(!exists) {
                return;
            }

            fs.readFile(fullpath, "binary", function(err, file) {
                if(err) {
                    return;
                }
                res.sendFile(fullpath);
            });
        });
    }
};