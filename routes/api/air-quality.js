const express = require('express');

const router = express.Router();

const uuidv1 = require('uuid/v1'); // based on timestamp

const IpfsApi = require('ipfs-api');
const OrbitDB = require('orbit-db');

const ipfs = IpfsApi('/ip4/127.0.0.1/tcp/5002');
const orbitdb = new OrbitDB(ipfs);
///ip4/127.0.0.1/tcp/4002/ipfs/QmNQj3fEk4JwKMQDudC5SFfoPGSyZnyjJPzngnXuH3YJGh
const DB_ADDRESS = '/orbitdb/QmUppFtbPfmrMkSWWFCrh4cSucXfUtoHpfKZjQ26Xm9hMT/foobot';
const CATEGORY = "AirQuality";

/* Get all records with airQuality category. */
router.get('/', async function (req, res, next) {
    try {

        // open database connection
        const db = await orbitdb.docs(DB_ADDRESS);

        // load the locally persisted database state to memory
        await db.load();
        // database is now ready to be queried

        // request data from database
        const result = await db.query((doc) => doc._id.toString().includes(CATEGORY));

        // close database connection
        await db.close();

        // send response to the HTTP request
        res.send(result)

    } catch (e) {
        next(e)
    }
});

/* Get airQuality record by key. */
router.get('/:pk', async function (req, res, next) {
    try {

        // open database connection
        const db = await orbitdb.open(DB_ADDRESS);

        // load the locally persisted database state to memory
        await db.load();
        // database is now ready to be queried

        // get pk from request params
        const pk = req.params.pk.toString();

        // request data from database
        const result = await db.query((doc) => doc._id === pk);

        // close database connection
        await db.close();

        // send response to the HTTP request
        res.send(result)

    } catch (e) {
        next(e)
    }
});

/* ADD airQuality record */
router.post('/', async function (req, res, next) {
    try {

        // connect to database
        const db = await orbitdb.open(DB_ADDRESS);

        // create unique id
        const pk = `${CATEGORY}_${uuidv1()}`;

        // load the locally persisted database state to memory
        await db.load();
        // database is now ready to be queried

        // add unique id to the request
        const obj = {...{_id: pk, timeStamp: Date.now()}, ...req.body};

        // get hash of created record
        const hash = await db.put(obj);

        // close database connection
        await db.close();

        // send response to the HTTP request
        res.status(201).send({"hash": hash, "response": obj})

    } catch (e) {
        next(e)
    }
});

/* ADD airQuality record */
router.put('/:pk', async function (req, res, next) {
    try {
        // connect to database
        const db = await orbitdb.open(DB_ADDRESS);

        // get pk from request params
        const pk = req.params.pk;

        // load the locally persisted database state to memory
        await db.load();
        // database is now ready to be queried

        // add unique id to the request
        const obj = {...{_id: pk}, ...req.body};

        // update object
        const hash = await db.put(obj);

        // request data from database
        const result = await db.get(pk);

        // close database connection
        await db.close();

        // send response to the HTTP request
        res.send({"hash": hash, "response": result})
    }catch (e) {
        next(e);
    }
});

/* Remove airQuality record */
router.delete('/:pk', async function (req, res, next) {
    try{
        // connect to database
        const db = await orbitdb.open(DB_ADDRESS);

        // get pk from request params
        const pk = req.params.pk;

        // load the locally persisted database state to memory
        await db.load();
        // database is now ready to be queried

        // remove object from database
        const hash = await db.del(pk);

        // close database connection
        await db.close();
        // send response to the HTTP request
        res.send({"hash": hash});
    }catch (e) {
        next(e)
    }
});

module.exports = router;
