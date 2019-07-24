const MongoClient = require('mongodb').MongoClient;
const constants = require('../constants');

const { Textile } = require("@textile/js-http-client");

const airQualitySchema = require('../schemas/AirQuality');
const cushionSchema = require('../schemas/Cushion');
const energyApplianceMonitorSchema = require('../schemas/EnergyApplianceMonitor');
const energyMonitorSchema = require('../schemas/EnergyMonitor');
const ipCameraSchema = require('../schemas/IPCamera');
const ipfsCameraSchema = require('../schemas/IPFSCamera');
const smartTableSchema = require('../schemas/SmartTable');

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

// The root provides a resolver function for each API endpoint
const root = {
    airQuality: async ({names}) => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile.files.list(threadConfig[AIR_QUALITY].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

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
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile.files.list(threadConfig[AIR_QUALITY].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

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
        // for (let i = 0; i < uniqueAirQualityNames.length; i++) {
        //     data.filter((data) => data.name === uniqueAirQualityNames[i]);
        // }
        //
        // if(orderBy === "TIME") {
        //     data.sort((a,b) => {
        //         return new Date(b.time) - new Date(a.time)
        //     })
        // }

        console.log(`Data length: ${data.length}`);

        return data
    },
    cushion: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile2.files.list(threadConfig[CUSHION].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile2.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        return data[0]
    },
    cushionList: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile2.files.list(threadConfig[CUSHION].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile2.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        return data
    },

    energyMonitor: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile3.files.list(threadConfig[ENERGY_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile3.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    energyMonitorList: async ({orderBy}) => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile4.files.list(threadConfig[ENERGY_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile4.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

        if(orderBy === "TIME") {
            data.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            })
        }

        return data
    },
    energyApplianceMonitor: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile5.files.list(threadConfig[ENERGY_APPLIANCE_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile5.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    sleep: async ({ name, startDate, endDate }) => {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        const db = client.db('k-log-iot');

        // const startDate = "2019-05-21T14:03:00Z";
        // const endDate = "2019-05-21T14:03:00Z";

        const docs = await db.collection(constants.SLEEP).find({name: name}).toArray();

        const filteredDocs = docs.filter((item) => {
            return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        });

        const output =  {
            "name": name ? name : 'smartWatch01',
            "user": "alex",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "sleepAnalysis": filteredDocs
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
            "name": name ? name : 'smartWatch01',
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
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile6.files.list(threadConfig[IP_CAMERA].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile6.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    ipfsCamera: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textile7.files.list(threadConfig[IPFS_CAMERA].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile7.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    }
};

module.exports = root;
