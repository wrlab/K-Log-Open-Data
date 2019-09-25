const fetch = require('node-fetch');
const moment = require('moment');

// const auth_token = "eyJhbGciOiJIUzI1NiJ9.eyJncmFudGVlIjoieW9vQGJ5b28ubmV0IiwiaWF0IjoxNDgyMTcwMTQ5LCJ2YWxpZGl0eSI6LTEsImp0aSI6IjBCQjlFNkRFLUE0QjYtNDM5NS1BNTNDLTNDQTQzQUI3QzVGQSIsInBlcm1pc3Npb25zIjpbImRldmljZTpyZWFkIiwidXNlcjpyZWFkIl0sInF1b3RhIjoxNTAwMCwicmF0ZUxpbWl0Ijo1fQ.LG0UYX9qmmHiAF9cW-XGjM3u1Fx2k4naJ20CVTCJx7g";

const auth_token = "eyJhbGciOiJIUzI1NiJ9.eyJncmFudGVlIjoibGFiQHdybC5vbmwiLCJpYXQiOjE1MTMyNzIxMzcsInZhbGlkaXR5IjotMSwianRpIjoiMTI2OEE2OTUtRTJBRS00NDI5LTlGNEItN0ZDNjg4MTE1RkI5IiwicGVybWlzc2lvbnMiOlsiZGV2aWNlOnJlYWQiLCJ1c2VyOnJlYWQiXSwicXVvdGEiOjE1MDAwMCwicmF0ZUxpbWl0Ijo1fQ.Zmv_1cYR8223W5PGpEF0LxCvaKNGj3-BBBIxEiKtfWI"

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY-TOKEN': auth_token
};

const locationInfo = {
    "Yoo-Foobot00": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "L8321",
        location: "고장"
    },
    "Yoo-Foobot02": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "L8321",
        location: "임완호 컴퓨터 뒤"
    },
    "Yoo-Foobot04": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 1",
        room: "L1332",
        location: " 복도 아래"
    },
    "Yoo-Foobot06": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 1",
        room: "L1332",
        location: "복도 위"
    },
    "Yoo-Foobot08": {address: "-", room: "-", location: "-"},
    "Yoo-Foobot09": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 1",
        room: "L1357",
        location: "복도 위"
    },
    "Yoo-Foobot10": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 1",
        room: "L1357",
        location: "복도 아래"
    },
    "Yoo-Foobot11": {address: "-", room: "-", location: "-"},
    "Yoo-Foobot12": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "L8321",
        location: "보관함"
    },
    "Yoo-Foobot13": {address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5", room: "-", location: "-"},
    "Yoo-Foobot14": {address: "유병현", room: "", location: "-"},
    "Yoo-Foobot15": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "L8-김수현",
        location: "-"
    },
    "Yoo-Foobot16": {address: "-", room: "", location: "-"},
    "Yoo-Foobot17": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 1",
        room: "L1 3층",
        location: "on the table"
    },
    "Yoo-Foobot18": {address: "-", room: "", location: "-"},

    "Lab-Foobot01": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "livinglab",
        location: "-"
    },
    "Lab-Foobot02": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "livinglab",
        location: "-"
    },
    "Lab-Foobot03": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "livinglab",
        location: "-"
    },
    "Lab-Foobot04": {
        address: "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
        room: "livinglab",
        location: "-"
    }
};

async function queryLatestDataForEveryFoobot(fn) {
    // const user_id = "yoo@byoo.net"; // 15 foobots
    let user_id = "lab@wrl.onl"; //living lab
    const average = 0;

    let devicesInfo = null;

    try {
        devicesInfo = await getDevicesInfo(user_id);

    } catch (err) {
        console.error(`Fetching devices info failure:\nUser ID: ${user_id}\n${err}\n`);
        return;
    }

    const notInclidedFoobs = ['2C034667827044D0', '2D014665384045A0'];

    devicesInfo = devicesInfo.filter(item => {return !notInclidedFoobs.includes(item.uuid)});


    for await (let item of devicesInfo) {
        let foobo = null;

        try {
            foobo = await getDataFromFoobot(item.uuid, average);

            const dataAirQuality = {
                "name": item.name,
                "user": user_id,
                "address": locationInfo[item.name].address,
                "room": locationInfo[item.name].room,
                "location": locationInfo[item.name].location,
                "time": moment(foobo.datapoints[0][0] * 1000 + 3600).format(),
                "particle": foobo.datapoints[0][1],
                "temp": foobo.datapoints[0][2],
                "humidity": foobo.datapoints[0][3],
                "co2": foobo.datapoints[0][4],
                "voc": foobo.datapoints[0][5],
                "pollution": foobo.datapoints[0][6]
            };
            console.log(dataAirQuality);
            fn(dataAirQuality);
        } catch (err) {
            console.error(`Fetching devices info failure:\nUUID: ${item.uuid}\n${err}\n`);
            return;
        }
    }
}

async function getDevicesInfo(user_id) {
    console.log(`Query devices info\nUser ID: ${user_id}\n`);

    const response = await fetch('http://api.foobot.io/v2/owner/' + user_id + '/device/', {
        headers: headers
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        console.log(`Fetching devices info:\nStatus: ${response.statusText}\n`);
        return response.json()
    }
}

async function getDataFromFoobot(uuid, average) {
    console.log(`Query foobot info\nFoobot UUID:${uuid}\n`);

    const response = await fetch('http://api.foobot.io/v2/device/' + uuid + '/datapoint/0/last/' + average + '/', {
        headers: headers
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        console.log(`Fetching data from foobot:\nStatus: ${response.statusText}\n`);
        return response.json()
    }
}

module.exports = {
    queryAirQuality: queryLatestDataForEveryFoobot
};
