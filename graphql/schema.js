const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type AirQuality {
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
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
    _id: String,
    _index: String,
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    url: String
  },
  
  type IPFSCamera {
    _id: String,
    _index: String,
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    time: String,
    url: String,
    hash: String
  },
   
  enum OrderBy {
    TIME
  } 
   
  type Query {
    airQuality(names: [String]): [AirQuality],
    airQualityList(name: String, orderBy: OrderBy): [AirQuality],
    
    cushion: Cushion,
    cushionList: [Cushion],
    
    energyMonitor: EnergyMonitor,
    energyMonitorList(orderBy: OrderBy): [EnergyMonitor],
    
    energyApplianceMonitor: EnergyApplianceMonitor,
    sleep: Sleep,
    smartTable: SmartTable,
    smartWatch: SmartWatch,
    ipCamera: IPCamera,
    ipfsCamera: IPFSCamera
  }
`);

module.exports = schema;
