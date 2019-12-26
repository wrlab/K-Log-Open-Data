// mongodb routes for smart watch

const express = require('express');
const router = express.Router();

const constants = require('../constants');

const MongoClient = require('mongodb').MongoClient;

const ipfsClient = require('ipfs-http-client');

// connect to ipfs daemon API server
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });


router.get('/heart-rate', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.HEART_RATE).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/heart-rate', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.HEART_RATE).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/step-count', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.STEP_COUNT).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/step-count', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.STEP_COUNT).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});


router.get('/exercise-time', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        try {
            const output = db.collection(constants.EXERCISE_TIME).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
                client.close();

                if(docs.length > 0) {
                    res.status(200).send(docs[0]);
                } else {
                    res.status(204).send();
                }
            });
        } catch (e) {
            res.status(500).send();
        }

    });
});

router.post('/exercise-time', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {

        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.EXERCISE_TIME).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/sleep', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.SLEEP).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/sleep', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.SLEEP).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/stand-hour', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.EXERCISE_TIME).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/stand-hour', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {

        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.STAND_HOUR).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

module.exports = router;
