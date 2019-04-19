const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type AirQuality {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    humidity: Float,
    temp: Float, 
    particle: Float, 
    co2: Float, 
    voc: Float, 
    pollution: Float 
  },
  
  type Cushion {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    pressure: Float,
    temp: Float, 
    status: Float
  },
  
  type EnergyApplianceMonitor {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    applianceId: String,
    activePower: Float
  },
  
  type EnergyMonitor {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    consumption: Float,
    alwaysOn: Float
  },
  
  type Sleep {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    startDate: String,
    endDate: String, 
    totalSleep: Float
  },
  
  type SmartTable {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    foodList: [String],
    caloryList: [String], 
    snapShot: String
  },
  
  type SmartWatch {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    startDate: String,
    endDate: String, 
    stepCount: Int, 
    heartRate: Int, 
    exerciseTime: Float, 
    standHour: Float
  },
  
  type IPCamera {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    url: String
  },
  
  type IPFSCamera {
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    url: String,
    hash: String
  },
 
  type Query {
    airQuality: AirQuality,
    cushion: Cushion,
    energyApplianceMonitor: EnergyApplianceMonitor,
    energyMonitor: EnergyMonitor,
    sleep: Sleep,
    smartTable: SmartTable,
    smartWatch: SmartWatch,
    ipCamera: IPCamera,
    ipfsCamera: IPFSCamera
  }
`);

module.exports = schema;
