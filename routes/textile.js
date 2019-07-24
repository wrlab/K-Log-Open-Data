const express = require('express');
const router = express.Router();

const fs = require('fs');

// Import the main Textile client
const { Textile } = require("@textile/js-http-client");

const airQualitySchema = require('../schemas/AirQuality');
const cushionSchema = require('../schemas/Cushion');
const energyApplianceMonitorSchema = require('../schemas/EnergyApplianceMonitor');
const energyMonitorSchema = require('../schemas/EnergyMonitor');
const ipCameraSchema = require('../schemas/IPCamera');
const ipfsCameraSchema = require('../schemas/IPFSCamera');
const smartTableSchema = require('../schemas/SmartTable');

const heartRateSchema = require('../schemas/HeartRate');
const sleepSchema = require('../schemas/Sleep');
const exerciseTimeSchema = require('../schemas/ExerciseTime');
const standHourSchema = require('../schemas/StandHour');
const stepCountSchema = require('../schemas/StepCount');

const threadConfig = require('../config.json');

// Or, create an instance specifying your custom Textile node API connection
const textile = new Textile({
    url: "http://127.0.0.1",
    port: 40600,
});

const textile2 = new Textile({
    url: "http://127.0.0.1",
    port: 40700,
});

const textile3 = new Textile({
    url: "http://127.0.0.1",
    port: 40800,
});

const textile4 = new Textile({
    url: "http://127.0.0.1",
    port: 40900,
});

const textile5 = new Textile({
    url: "http://127.0.0.1",
    port: 41000,
});

const textile6 = new Textile({
    url: "http://127.0.0.1",
    port: 41100,
});

const textile7 = new Textile({
    url: "http://127.0.0.1",
    port: 41200,
});

const textile8 = new Textile({
    url: "http://127.0.0.1",
    port: 41300,
});

const textile9 = new Textile({
    url: "http://127.0.0.1",
    port: 41400,
});

const textile10 = new Textile({
    url: "http://127.0.0.1",
    port: 41500,
});

const textile11 = new Textile({
    url: "http://127.0.0.1",
    port: 41600,
});

const textile12 = new Textile({
    url: "http://127.0.0.1",
    port: 41700,
});

const AIR_QUALITY = "air-quality";
const CUSHION = "cushion";
const ENERGY_APPLIANCE_MONITOR = "energy-appliance-monitor";
const ENERGY_MONITOR = "energy-monitor";
const IP_CAMERA = "ip-camera";
const IPFS_CAMERA = "ipfs-camera";
const SMART_TABLE = "smart-table";

const SLEEP = "sleep";
const HEART_RATE = "heart-rate";
const STAND_HOUR = "stand-hour";
const STEP_COUNT = "step-count";
const EXERCISE_TIME = "exercise-time";


//services
const service = require('../services/air-quality-service');
const energyMonitorService = require('../services/energy-monitor-service');

router.get('/init', async (req, res) => {
    const arr = [AIR_QUALITY, CUSHION, ENERGY_APPLIANCE_MONITOR, ENERGY_MONITOR, IP_CAMERA,
        IPFS_CAMERA, SMART_TABLE, SLEEP, HEART_RATE, STAND_HOUR, STEP_COUNT, EXERCISE_TIME];
    const arrSchema = [airQualitySchema, cushionSchema, energyApplianceMonitorSchema, energyMonitorSchema,
        ipCameraSchema, ipfsCameraSchema, smartTableSchema, sleepSchema, heartRateSchema,
        standHourSchema, exerciseTimeSchema, stepCountSchema];

    const endpoints = [
        textile, textile2, textile3, textile4, textile5, textile6, textile7, textile8, textile9, textile10, textile11,
        textile12
    ];

    const threadConfig = {};

    let i = 0;

    for await (let item of arr) {
        const thread = await endpoints[0].threads.add(item, arrSchema[i], undefined, 'read_only', 'invite_only');
        threadConfig[thread.name] = {id: thread.id, key: thread.key};
        i++
    }

    const json = JSON.stringify({...threadConfig});
    fs.writeFile('config.json', json, 'utf8', (err)=> {console.log('Done!' + err);res.send();});
});

router.get('/air-quality', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[AIR_QUALITY].id, "", LIMIT);
        // res.send(list)
        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }

    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/air-quality', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[AIR_QUALITY].id);
    res.send(block)
});

router.get('/cushion', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[CUSHION].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/cushion', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[CUSHION].id);
    res.send(block)
});

router.get('/energy-appliance-monitor', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.blocks.list(threadConfig[ENERGY_APPLIANCE_MONITOR].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/energy-appliance-monitor', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[ENERGY_APPLIANCE_MONITOR].id);
    res.send(block)
});

router.get('/cushion', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.blocks.list(threadConfig[CUSHION].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/energy-monitor', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[ENERGY_MONITOR].id);
    res.send(block)
});

router.get('/energy-monitor', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[ENERGY_MONITOR].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/ip-camera', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[IP_CAMERA].id);
    res.send(block)
});

router.get('/ip-camera', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[IP_CAMERA].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/ipfs-camera', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[IPFS_CAMERA].id);
    res.send(block)
});

router.get('/ipfs-camera', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[IPFS_CAMERA].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/smart-table', async (req, res) => {
    const data = req.body.data;
    const block = await textile.files.add(data, "", threadConfig[SMART_TABLE].id);
    res.send(block)
});

router.get('/smart-table', async (req, res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[SMART_TABLE].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});



router.get('/heart-rate', async (req,res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[HEART_RATE].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/heart-rate', async (req, res) => {
    let output = [];
    for await (let item of req.body.data) {
        const data = {
            "type": item.type,
            "name": item.name,
            "user": item.user,
            "startDate": item.startDate,
            "endDate": item.endDate,
            "heartRate": item.heartRate
        };

        const block = await textile.files.add(data, "", threadConfig[HEART_RATE].id);
        output.push(block)
    }

    res.status(201).send(output);
});

router.get('/step-count', async (req,res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[STEP_COUNT].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/step-count', async (req, res) => {
    let output = [];
    for await (let item of req.body.data) {
        const data = {
            "type": item.type,
            "name": item.name,
            "user": item.user,
            "startDate": item.startDate,
            "endDate": item.endDate,
            "stepCount": item.stepCount
        };

        const block = await textile.files.add(data, "", threadConfig[STEP_COUNT].id);
        output.push(block)
    }

    res.status(201).send(output);
});


router.get('/exercise-time', async (req,res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[EXERCISE_TIME].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/exercise-time', async (req, res) => {
    let output = [];
    for await (let item of req.body.data) {
        const data = {
            "type": item.type,
            "name": item.name,
            "user": item.user,
            "startDate": item.startDate,
            "endDate": item.endDate,
            "exerciseTime": item.heartRate
        };

        const block = await textile.files.add(data, "", threadConfig[EXERCISE_TIME].id);
        output.push(block)
    }

    res.status(201).send(output);
});

router.get('/sleep', async (req,res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[SLEEP].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/sleep', async (req, res) => {
    let output = [];
    for await (let item of req.body.data) {
        const data = {
            "type": item.type,
            "name": item.name,
            "user": item.user,
            "startDate": item.startDate,
            "endDate": item.endDate,
            "status": item.status,
        };

        const block = await textile.files.add(data, "", threadConfig[SLEEP].id);
        output.push(block)
    }

    res.status(201).send(output);
});

router.get('/stand-hour', async (req,res) => {
    const LIMIT = 1000;
    try {
        const list = await textile.files.list(threadConfig[STAND_HOUR].id, "", LIMIT);

        if (list !== undefined) {
            const output = [];
            for await (let item of list.items) {
                const buf = await textile.blocks.fileContent(item.block);
                const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                output.push(JSON.parse(str))
            }
            res.send(output)
        }
    }catch (e) {
        if(e.message === "Not Found") {
            res.status(204).send()
        }
    }
});

router.post('/stand-hour', async (req, res) => {
    let output = [];
    for await (let item of req.body.data) {
        const data = {
            "type": item.type,
            "name": item.name,
            "user": item.user,
            "startDate": item.startDate,
            "endDate": item.endDate,
            "standHour": item.standHour
        };

        const block = await textile.files.add(data, "", threadConfig[STAND_HOUR].id);
        output.push(block)
    }

    res.status(201).send(output);
});

// //every 7 minutes
// setInterval(()=> {
//     service.queryAirQuality((data) => {
//         textile.files.add(data, "", "12D3KooWGQnEbFYUmtgdhJbGAMg16cbPtuaqjYsY3vpJ4WubzGAA")
//     })
// }, 20000);
//
// //every 5 minute
// setInterval(()=> {
//     energyMonitorService.queryEnergyMonitor((data) => {
//         textile.files.add(data, "", "12D3KooWFzHgWQXsnfuxy73uMtgT6sUgabpWdQ5vQ5fkNu3qSF5v")
//     })
// }, 20000);

module.exports = router;
