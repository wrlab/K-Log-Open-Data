const IpfsClient = require('ipfs-http-client');
const OrbitDB = require('orbit-db');
const Identities = require('orbit-db-identity-provider');

const config = require('./config');

class OrbitdbStore {
    constructor(ipfs_cli_address, identity_name, db_directory){
        this._ipfs = IpfsClient(ipfs_cli_address);
        this.db = null;
        this.identity_name = identity_name;
        this.db_directory = db_directory;
    }

    async createIdentity(name) {
        const options = { id: name };
        return await Identities.createIdentity(options)
    }

    async startDB(db_address) {
        const identity = await this.createIdentity(this.identity_name);

        const orbitdb = await OrbitDB.createInstance(this._ipfs, {directory: this.db_directory, identity: identity});

        this.db = await orbitdb.open(db_address);

        this.listenOrbitdbEvents(this.db);
    }

    async getDataStore(){
        return this.db;
    }

    listenOrbitdbEvents(db) {
        if (config.subscribeOnEvents) {
            db.events.on('ready', (dbname, heads) => {
                // heads: ${JSON.stringify(heads)}
                console.log(`Local database is fully loaded.\ndbname: ${dbname}\n`)
            });

            db.events.on('replicate', (address) => {
                console.log(`Start replicate.\n${address}\n`)
            });

            db.events.on('replicated', (address) => {
                console.log(`Replicated.\n${address}\n`)
            });

            db.events.on('replicate.progress', (address, hash, entry, progress, have) => {
                //entry: ${entry}

                console.log(`Replicate progress.\naddress: ${address}\n hash: ${hash}\nprogress: ${progress}\n have: ${have}\n`)
            });

            db.events.on('load', (dbname) => {
                console.log(`Start loading.\n${dbname}\n`)
            });

            db.events.on('load.progress', (address, hash, entry, progress, total) => {
                //hash: ${hash}
                // entry: ${JSON.stringify(entry)}
                console.log(`Loading data store in memory.\naddress: ${address}\nprogress: ${progress}\ntotal: ${total}\n`)
            });

            db.events.on('write', (dbname, hash, entry) => {
                //hash: ${JSON.stringify(hash)}
                // entry: ${JSON.stringify(entry)}
                //Emitted after an entry was added locally to the database. hash is the IPFS hash of the latest state of the database. entry is the added database op.
                console.log(`Entry added locally to the database.\ndbname: ${dbname}\n`)
            });

            db.events.on('closed', (dbname) => {
                console.log(`Database closed.\ndbname ${dbname}\n`)
            });
        }
    }
}

const _orbitDB = new OrbitdbStore(config.ipfs_cli_address, config.ORBIT_DB_IDENTITY_NAME, config.ORBIT_DB_DIRECTORY);
// Object.freeze(_orbitDB);


module.exports = {
    orbitDBStore: _orbitDB
};