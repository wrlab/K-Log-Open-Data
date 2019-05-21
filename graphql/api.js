const db = require('../db');
const MongoClient = require('mongodb').MongoClient;
const constants = require('../constants');

// The root provides a resolver function for each API endpoint
const root = {
    airQuality: async ({names}) => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'airquality');

        let output = [];
        let uniqueAirQualityNames = [];

        if (names && names.length) {
            uniqueAirQualityNames = names;
        } else {
            const map = new Map();
            for (const item of data) {
                if(!map.has(item.name)){
                    map.set(item.name, true);    // set any value to Map
                    uniqueAirQualityNames.push(item.name);
                }
            }
        }

        for (let i = 0; i < uniqueAirQualityNames.length; i++) {
            const filteredData = data.filter(item => item.name === uniqueAirQualityNames[i]);

            filteredData.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            });

            output.push({...filteredData[0]})
        }

        return output
    },

    airQualityList: async ({names, orderBy}) => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        let data = await orbitDB.query((doc) => doc['_index'] === 'airquality');

        let uniqueAirQualityNames = [];

        if (names && names.length) {
            uniqueAirQualityNames = names;
        } else {
            const map = new Map();
            for (const item of data) {
                if(!map.has(item.name)){
                    map.set(item.name, true);    // set any value to Map
                    uniqueAirQualityNames.push(item.name);
                }
            }
        }
        for (let i = 0; i < uniqueAirQualityNames.length; i++) {
            data = data.filter((data) => data.name === uniqueAirQualityNames[i]);
        }

        if(orderBy === "TIME") {
            data.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            })
        }

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

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    energyMonitorList: async ({orderBy}) => {
        const orbitDB = await db.orbitDBStore.getDataStore();

        await orbitDB.load();

        const data = await orbitDB.query((doc) => doc['_index'] === 'energymonitor');

        if(orderBy === "TIME") {
            data.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            })
        }

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
    sleep: async ({ name, startDate, endDate }) => {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        const db = client.db('k-log-iot');

        // const name = 'smartWatch01';
        // const startDate = "2019-05-21T14:03:00Z";
        // const endDate = "2019-05-21T14:03:00Z";

        const docs = await db.collection(constants.SLEEP).find({name: name}).toArray();

        const filteredDocs = docs.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });

        const output =  {
            "name": name,
            "user": "alex",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "sleep": filteredDocs
        };

        return output;

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
    smartWatch: async ({ name, startDate, endDate }) => {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        const db = client.db('k-log-iot');

        // const name = 'smartWatch01';
        // const startDate = "2019-05-21T14:03:00Z";
        // const endDate = "2019-05-21T14:03:00Z";

        const docsExT = await db.collection(constants.EXERCISE_TIME).find({name: name}).toArray();
        const docsSH = await db.collection(constants.STAND_HOUR).find({name: name}).toArray();
        const docsSC = await db.collection(constants.STEP_COUNT).find({name: name}).toArray();
        const docsHR = await db.collection(constants.HEART_RATE).find({name: name}).toArray();

        const filteredDocsExT= docsExT.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });
        const filteredDocsSH= docsSH.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });
        const filteredDocsSC= docsSC.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });
        const filteredDocsHR= docsHR.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });

        return {
            "name": name,
            "user": "alex",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "stepCount": filteredDocsSC,
            "heartRate":  filteredDocsHR,
            "exerciseTime": filteredDocsExT,
            "standHour": filteredDocsSH
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