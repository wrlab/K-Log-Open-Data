const MongoClient = require('mongodb').MongoClient;

const fs = require('fs').promises;
const path = require('path');

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });
const constants = require('../constants');

// "metadata": {
//     "tags": ["tag1", "tag2", "tag13"],
//         "time":"2018-12-31T15:00:00.123Z",
//         "name": "camera1",
//         "user": "vietnamu",
//         "location": "location",
//         "room": "4"
// }

const cameras = {
    "cam-0": "4th floor living room counter",
    "cam-1": "4th floor porch",
    "cam-2": "4th floor Neutinamu1",
    "cam-3": "4th floor Neutinamu2",
    "cam-4": "4th floor Neutinamu3",
    "cam-5": "4th floor Neutinamu4",
    "cam-6": "4th floor Neutinamu5",
    "cam-7": "Outside the first floor porch",
    "cam-8": "1st floor daycare",
    "cam-9": "1st floor daycare living room",
    "cam-10": "1st floor Day Care Program Room",
    "cam-11": "2nd Stroke Day Protection Room",
};

const tags = {
    "세면관리": "Washing face",
    "퇴실": "Leaving",
    "구강관리": "Oral care",
    "의복교환": "Dressing",
    "환경관리": "Environmental management",
    "세탁물관리": "Laundry care",
    "외출동행": "Going out",
    "식사준비": "Meal preparation",
    "식사정리": "Clean up the meal",
    "대체식": "Alternate meal",
    "투약": "Medication",
    "보행": "Walking",
    "기저귀": "Diaper",
    "망상": "Delusion",
    "감정실금": "Emotional incontinence",
    "거부": "Denial",
    "이탈": "Breakaway",
    "일탈": "Disinhibition",

    "머리감기기": "Shampoo",
    "몸단장": "Grooming",
    "침구린넨교환": "Bed making",
    "물품관리": "Article management",
    "체위변경": "Position change",
    "의사소통도움": "Communication",
    "식사도움": "Meal help",
    "구토물정리": "Clean up the vomit",
    "캔영양": "Can nutrition",
    "수분공급": "Hydration",
    "휠체어": "Wheelchair",
    "화장실": "Toilet",
    "기타이동식변기": "Portable toilet",
    "환각환청": "Hallucination",
    "주야혼동": "Day and night confusion",
    "불안": "Anxiety",
    "배회": "Wandering",
    "물품훼손": "Damage",
    "불결행위": "Filthy",
    "작화": "Scribing",
    "하차": "Get off",

    "이식": "Bad eating",
    "수집": "Collecting",
    "승차": "Ride",
    "입실": "Room",
    "폭언폭력": "Violence"
};

const uploadedHashes = [
    'QmTpbVxkwsJp78FqAB7zJpgZRWRPKWbySZu5AFSLf6aeWR',
        'QmcEGWtYHmbMKM2mbf8FNKCKyz39zEGtxQ4de2Jx9oTeDh',
        'QmfSaUG4LBvykAgYFWyjdbNiDUT8ypphUmNTMK2zLbTujh',
        'QmYhAnSsdDasTEuh4b3Fk6XemZKVzjyxYqV1Snfgyri3AM',
        'QmXASKbHyuj7T2gGZxPu9souDqQ8twHQKbueJpRLgPAe6Q',
        'QmTpbVxkwsJp78FqAB7zJpgZRWRPKWbySZu5AFSLf6aeWR',
        'QmahHMRbYLBwYZqS3FrABvZYRfHyzEX42BeB1fEDpqA2ie',
        'QmdEgMAJzSgFSUWBiy7aT3ZWkAEA63TvoP9PjNK5yHoGqG',
        'Qmc2oeTErghqoTB3N9j8te8QEfGRPTfTNH77aXARiMeuDJ',
        'QmfVLgW52bZDWsmaxBqW1eLHvHETVunhHsPPahiGmWEamQ',
        'QmQenCT63ETaj6Rc6DS5mLHamPFVMcv6U2gLG9zMuXBD5k',
        'QmcEGWtYHmbMKM2mbf8FNKCKyz39zEGtxQ4de2Jx9oTeDh',
        'QmZPoY4QF5RgGHCPwtpLhWfVp7JSEwSTqpj9RDkZF7dZ5Q',
        'QmbSCfMWe93twA3XzUEboiQFEo4qz58rS7n9SCoT1HqivW',
        'QmfSaUG4LBvykAgYFWyjdbNiDUT8ypphUmNTMK2zLbTujh',
        'QmYhAnSsdDasTEuh4b3Fk6XemZKVzjyxYqV1Snfgyri3AM',
        'QmafgpmPcw69DFQjKwdcYhh5QyyW5nWFtiKvnfwinG5TJf',
        'QmNmCFVHnPXy9ip5AJSE4P9TyGMqpgGN8sGSM2r4MnAazc',
        'QmQX26gc73fj6UoEwxNjfLZwxUf9YCPnQJzp2J8CePhVQa',
        'QmeJMSprC1wXUjsk1tbihqhZYby9Cv6oGUPTsXRucNnnPS',
        'QmXASKbHyuj7T2gGZxPu9souDqQ8twHQKbueJpRLgPAe6Q',
        'QmX3pBdqoEBmxTkGzP2tfjuoBTPACU5G3nmKNaSxnXcZoj',
        'QmX8ULWunstJdPG2QfxpcG9B8oTxBUMiZoZ6GjyT2mq7An',
        'QmVM3QbHRijKZ6ZvQY5CHaJecV1ddyjGP1Lk583MsKgAj4',
        'QmPSM5CzSVd3eXdrA4qhiJY9qXC7HFHV3KAvZKTA6fWBoD',
        'Qmey3sqeowgJiycRMwqc4UgghyNQruSPHkGz7jss3VVCpi',
        'QmWEWWhZyq1UV99Vfw1UgjMn21YKWTXFRXWzjJJpn3kyq6',
        'QmVKjvnB8LTTAQyUpy44WegyTgP9wF31zni56kBjz4TvfB',
        'QmTv2Tx9XQeLrvg8rs9LCCih6FrHt2mXs3LVBt23ZD7eE7',
        'QmZD7j1XZQ5Wga3pYMQCxkpm27jb7RjfbqjhSEh7NkEDrR',
        'QmZa5e6qkdhvBVUbqkzbrwKXq3Ui5yXCdcoxCt1NyrpBDP',
        'QmZDeWUAnTjYm5MuhVaGThEGLaoAS2bEdPJ9X5eBoHX1t1',
        'Qmd8geso6GYiBM8edQT26MPggm4SCq2rtagJX9BrTCJ7vk',
        'QmcDexx4bE7nQzhDH32JVPVxkKmBX4PgzzRc2VJNZ8DCuw',
        'QmZ2cvJQDjktAE75DwmdBCM1mvjbyPoMycv67nvAQJiTJ8',
        'QmQK4GFCUTSSD35xiBipzudq8pkwZ4W86bZQFupFbLswC8',
        'QmbSkAVstFFqarD3JfGQoZnEN4oJMUeyN33ywwkfcTaft7',
        'QmPaCvCuHGeSfedFdwvXKR7aRuiQ63mLNmMnuRuNLjgvF2',
        'QmPpeiynkfVpTajH3CMb8682vnNrhnBdsQjMToyeTswmSb',
        'QmTca4A43f4kEvzTouvYTegtp6KobixRqweV12NrvwwtFP',
        'Qmem4exur6JCXTkJuc4XSYttEzFJg1U6RejgKrot7DNuCB',
        'QmUWsrcgqAdsVoWMG9UUMoT5hNgGanJAiwacCj3c7WWGgn',
        'QmPdSwMEm8f7MrH6ayfeQb2B6gJtiaR2vAXzrHwsa6tHuB',
        'QmcSotocY6Jp618zttwSY4iUpKVj96PSLzw3rke2vZPDjZ'
];

const randTags = () => {
    const oneToFive = Math.floor(Math.random() * 5) +1;
    let tagList = [];
    const tagsKeys =  Object.keys(tags);

    for( let item of [...Array(oneToFive).keys()] ) {
        const randTagIdx = Math.floor(Math.random() * Object.keys(tags).length);

        tagList.push(tags[tagsKeys[randTagIdx]]);
    }

    return tagList;
};

const randCameraName = () => {
    const cameraKeys =  Object.keys(cameras);
    const randCameraIdx = Math.floor(Math.random() * Object.keys(cameras).length);
    return cameras[cameraKeys[randCameraIdx]];
};

const randVideoName = () => {
    const randCameraIdx = Math.floor(Math.random() * 44) + 1;
    return randCameraIdx + '.mp4';
};

const randHashName = () => {
    const randCameraIdx = Math.floor(Math.random() * 44) + 1;
    return uploadedHashes[randCameraIdx];
};

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// console.log(randTags());
// console.log(randCameraName());
// console.log(randHashName());
// console.log(randomDate(new Date(2016, 0, 1), new Date()));


const uploadToMongoDB = async () => {
    const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });
    const options = {
        cidVersion: 0
    };

    for await (let idx of [...Array(1000).keys()]) {
        const metadata = {
            tags: randTags(),
            time: randomDate(new Date(2016, 0, 1), new Date()),
            name: randCameraName(),
            user: "Living lab user",
            userID: Math.floor(Math.random() * 4) + 1,
            location: "living lab",
            room: "living lab room"
        };

        try {
            await client.connect();

            const db = client.db(constants.MONGODB_NAME);

            const doc = {
                metadata: {...metadata},
                options: options,
                hash: randHashName()
            };

            await db.collection('video').insertOne(doc);

        } catch (e) {
            console.log(e)
        }
    }
};

uploadToMongoDB()
// const uploadVideos = async () => {
//     let uploadedHashes = [];
//     for await (let idx of [...Array(44).keys()]) {
//         const fileHandle = await fs.readFile(__dirname + '/' + idx +'.mp4');
//         const bufRes = await ipfs.add(fileHandle);
//         uploadedHashes.push(bufRes[0].hash)
//     }
//     console.log(uploadedHashes)
// };
// uploadVideos();
// async function start() {
//     const metadata = req.body.metadata;
//
//     let fileHandle;
//     try {
//         fileHandle = await fs.readFile(path.dirname(require.main.filename) + '/6.mp4');
//     } catch (e) {
//         res.status(500).send({
//             err: e,
//             message: "Reading video file failed!"
//         });
//     }
//
//     let bufRes = undefined;
//
//     try {
//         bufRes = await ipfs.add(fileHandle, options);
//     } catch (e) {
//         res.status(500).send({
//             err: e,
//             message: "Adding to IPFS failed!"
//         });
//     }
//     const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });
//
//     try {
//         await client.connect();
//
//         const db = client.db(constants.MONGODB_NAME);
//
//         const doc = {
//             metadata: {...metadata},
//             options: options,
//             hash: bufRes[0].hash
//         };
//
//         await db.collection('video').insertOne(doc);
//
//         res.status(201).send({
//             hash: bufRes[0].hash,
//             pinSize: bufRes[0].size,
//             date: Date.now()
//         })
//     } catch (e) {
//         await client.close();
//         res.status(500).send({
//             err: e,
//             message: "Adding to MongoDB failed!"
//         });
//     }
// }
