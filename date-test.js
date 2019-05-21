const docs = [
    {
        "_id": "5ce3b801f08d794128331921",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-21T14:03:00Z",
        "endDate": "2019-05-21T14:03:00Z",
        "status": "Inbed"
    },
    {
        "_id": "5ce3b801f08d794128331922",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-21T14:03:00Z",
        "endDate": "2019-05-21T14:03:00Z",
        "status": "Inbed"
    },
    {
        "_id": "5ce3b801f08d794128331923",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-21T01:52:00Z",
        "endDate": "2019-05-21T01:52:00Z",
        "status": "Inbed"
    },
    {
        "_id": "5ce3b801f08d794128331924",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-21T01:50:00Z",
        "endDate": "2019-05-21T01:50:00Z",
        "status": "Asleep"
    },
    {
        "_id": "5ce3b801f08d794128331925",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-21T01:45:00Z",
        "endDate": "2019-05-21T01:49:00Z",
        "status": "Inbed"
    },
    {
        "_id": "5ce3b801f08d794128331926",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-20T12:24:00Z",
        "endDate": "2019-05-20T14:59:00Z",
        "status": "Asleep"
    },
    {
        "_id": "5ce3b801f08d794128331927",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-19T13:05:00Z",
        "endDate": "2019-05-19T13:20:00Z",
        "status": "Inbed"
    },
    {
        "_id": "5ce3b801f08d794128331928",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-15T11:13:00Z",
        "endDate": "2019-05-15T11:37:00Z",
        "status": "Asleep"
    },
    {
        "_id": "5ce3b801f08d794128331929",
        "type": "smartWatch",
        "name": "smartWatch01",
        "user": "alex",
        "startDate": "2019-05-15T10:13:00Z",
        "endDate": "2019-05-15T11:13:00Z",
        "status": "Inbed"
    }
];

const startDate = "2019-05-21T14:02:00Z";
const endDate = "2019-05-21T14:03:00Z";

const filtered = docs.filter((item) => {
    return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) >= new Date(endDate);
});

// console.log(true && true)
console.log( new Date(endDate) <= new Date(endDate))
console.log(new Date(startDate) >= new Date(endDate))
console.log(docs)

