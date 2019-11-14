const express = require('express');
const router = express.Router();

const constants = require('../../constants');
const MongoClient = require('mongodb').MongoClient;

const fs = require('fs').promises;
const path = require('path');

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });


router.get('/cameras', async (req, res) => {
    const tags = req.body.tags; // array of tags(Toilet, Diaper, Portable toilet etc...)
    // const startDate = req.body.startDate;
    // const endDate = req.body.endDate;
    // const location = metadata.location; //living lab or s-home
    const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });

    try {

        await client.connect();

        const db = client.db(constants.MONGODB_NAME);

        const col = db.collection('video');

        const docs = await col.find({
            // "metadata.tags": { $in: tags },
            // "metadata.time": {
            //     $gte: new Date(2015, 0, 1, 0, 0, 0, 123),
            //     $lte: new Date(2019, 0, 1, 0, 0, 0, 123)
            // },
        }).limit(1000).toArray();

        await client.close();

        res.send(docs)
    } catch (e) {
        await client.close();
        res.status(500).send({
            err: e.toString(),
            message: "Query data from mongodb failed!"
        });
    }
});

router.post('/cameras', async (req, res) => {
    const options = req.body.options;
    const metadata = req.body.metadata;

    let fileHandle;
    try {
        fileHandle = await fs.readFile(path.dirname(require.main.filename) + '/6.mp4');
    } catch (e) {
        res.status(500).send({
            err: e,
            message: "Reading video file failed!"
        });
    }

    let bufRes = undefined;

    try {
        bufRes = await ipfs.add(fileHandle, options);
    } catch (e) {
        res.status(500).send({
            err: e,
            message: "Adding to IPFS failed!"
        });
    }
    const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });

    try {
        await client.connect();

        const db = client.db(constants.MONGODB_NAME);

        const doc = {
            metadata: {...metadata},
            options: options,
            hash: bufRes[0].hash
        };

        await db.collection('video').insertOne(doc);

        res.status(201).send({
            hash: bufRes[0].hash,
            pinSize: bufRes[0].size,
            date: Date.now()
        })
    } catch (e) {
        await client.close();
        res.status(500).send({
            err: e,
            message: "Adding to MongoDB failed!"
        });
    }
});

module.exports = router;

