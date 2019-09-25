const moment = require('moment');

const SmappeeAPI = require('smappee-nodejs');

const smappee = new SmappeeAPI({
    debug: false,

    clientId: "wrl",
    clientSecret: "kvR9j0SSoH",

    username: "wrl",
    password: "kistimrc"
});

function queryEnergyMonitor(fn) {
    //"26636": livinglab ID
    smappee.getLatestConsumption("26636", async function (output) {
        let dataConsumption = {
            "name": "Smappee00",
            "address": "Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8",
            "room": "L8223",
            "location": "분전반",
            "time": moment(output.timestamp).format(),
            "user": "livingLab",
            "consumption": output.consumption,
            "alwaysOn": output.alwaysOn,
            "solar": output.solar
        };
        fn(dataConsumption);
    });
}

module.exports = {
    queryEnergyMonitor: queryEnergyMonitor
};
