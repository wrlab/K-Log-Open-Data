// The root provides a resolver function for each API endpoint
const root = {
    airQuality: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "humidity": "34.2",
            "temp": "28.5",
            "particle": "1.3",
            "co2": "2.4",
            "voc": "1.3",
            "pollution": "23.6"
        }
    },
    cushion: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the chair",
            "time": "2017-05-30T18:54:20+09:00",
            "pressure": "79.2",
            "temp": "28.5",
            "status": "0"
        }
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
    energyMonitor: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "consumption": "230.2",
            "alwaysOn": "45.39"
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