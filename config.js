const ORBIT_DB_ADDRESS = '/orbitdb/zdpuAvMans9oABhVaBfBeUiGG4exKiaBrA7wHzxq7AY2aioxM/peers-time';
const ORBIT_DB_DIRECTORY = 'db-http-api-client';
const ORBIT_DB_IDENTITY_NAME = 'peer-http-api-td-client';
const IPFS_CLI_ADDRESS = '/ip4/127.0.0.1/tcp/5002/http';


module.exports = {
    db_address: ORBIT_DB_ADDRESS,
    ipfs_cli_address: IPFS_CLI_ADDRESS,
    subscribeOnEvents: true,
    ORBIT_DB_IDENTITY_NAME: ORBIT_DB_IDENTITY_NAME,
    ORBIT_DB_DIRECTORY: ORBIT_DB_DIRECTORY
};