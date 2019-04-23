const db = require('../db');

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