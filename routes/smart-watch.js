// mongodb routes for smart watch

const express = require('express');
const router = express.Router();

const constants = require('../constants');

const MongoClient = require('mongodb').MongoClient;


router.get('/heart-rate', async (req,res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db('k-log-iot');

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
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, async function (err, client) {
        const db = client.db('k-log-iot');

        let bulk = [];

        for (let item of req.body.data) {
            const data = {
                "type": item.type,
                "name": item.name,
                "user": item.user,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "heartRate": item.heartRate
            };

            bulk.push(data);
        }

        const resQuery = await db.collection(constants.HEART_RATE).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/step-count', async (req,res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db('k-log-iot');

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
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, async function (err, client) {
        const db = client.db('k-log-iot');

        let bulk = [];

        for (let item of req.body.data) {
            const data = {
                "type": item.type,
                "name": item.name,
                "user": item.user,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "stepCount": item.stepCount
            };

            bulk.push(data);
        }

        const resQuery = await db.collection(constants.STEP_COUNT).insertMany(bulk);

        res.status(201).send(resQuery.ops)
    });
});


router.get('/exercise-time', async (req,res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db('k-log-iot');

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

router.post('/exercise-time', async (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, async function (err, client) {
        const db = client.db('k-log-iot');

        let bulk = [];

        for (let item of req.body.data) {
            const data = {
                "type": item.type,
                "name": item.name,
                "user": item.user,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "exerciseTime": item.heartRate
            };

            bulk.push(data);
        }

        const resQuery = await db.collection(constants.EXERCISE_TIME).insertMany(bulk);

        res.status(201).send(resQuery.ops)

    });
});

router.get('/sleep', async (req,res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db('k-log-iot');

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
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, async function (err, client) {
        const db = client.db('k-log-iot');

        let bulk = [];

        for (let item of req.body.data) {
            const data = {
                "type": item.type,
                "name": item.name,
                "user": item.user,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "status": item.status,
            };

            bulk.push(data);
        }

        const resQuery = await db.collection(constants.SLEEP).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/stand-hour', async (req,res) => {
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db('k-log-iot');

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
    MongoClient.connect('mongodb://localhost:27017/k-log-iot', { useNewUrlParser: true }, async function (err, client) {
        const db = client.db('k-log-iot');

        let bulk = [];

        for (let item of req.body.data) {
            const data = {
                "type": item.type,
                "name": item.name,
                "user": item.user,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "standHour": item.standHour
            };

            bulk.push(data);
        }

        const resQuery = await db.collection(constants.STAND_HOUR).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

module.exports = router;