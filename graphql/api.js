const db = require('../db');

// The root provides a resolver function for each API endpoint
const root = {
    airQuality: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'airquality');
        console.log(`Data length: ${data.length}`);

        return data[0]
    },
    airQualityList: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'airquality');
        console.log(`Data length: ${data.length}`);

        return data
    },
    cushion: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'cushion');
        console.log(`Data length: ${data.length}`);

        return data[0]
    },
    cushionList: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'cushion');
        console.log(`Data length: ${data.length}`);

        return data
    },

    energyMonitor: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'energymonitor');
        console.log(`Data length: ${data.length}`);

        return data[0]
    },
    energyMonitorList: async () => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'energymonitor');

        return data
    },
    energyApplianceMonitor: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "applianceId": "W983MF",
            "activePower": "2030.03"
        }
    },
    sleep: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "startDate": "2017-09-10T00:00:00+09:00",
            "endDate": "2017-09-10T06:30:00+09:00",
            "totalSleep": "480.34"
        }
    },
    smartTable: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "foodList": ["kimchi", "rice", "driedSeaWeed"],
            "caloryList": ["40kcal", "250kcal", "30kcal"],
            "snapShot": "https://schema.iot.webizing.org/pictures/20180826"
        }
    },
    smartWatch: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "startDate": "2017-09-10T00:00:00+09:00",
            "endDate": "2017-09-10T06:30:00+09:00",
            "stepCount": "1830",
            "heartRate": "115",
            "exerciseTime": "95.5",
            "standHour": "1.02"
        }
    },
    ipCamera: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "url": "www.kist.videos/1"
        }
    },
    ipfsCamera: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "url": "www.kist.videos/1",
            "hash": "LKlasdfjloewLKDSF1239"
        }
    }
};

module.exports = root;