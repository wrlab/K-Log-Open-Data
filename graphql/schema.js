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
    sleep: [SleepAnalysis]
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
  
  type StepCount {
    _id: String,
    startDate: String,
    endDate: String, 
    stepCount: Int, 
  }
  
  type SleepAnalysis {
    _id: String,
    startDate: String,
    endDate: String, 
    status: String, 
  }
  
  type ExerciseTime {
    _id: String,
    startDate: String,
    endDate: String, 
    exerciseTime: Int, 
  }
  
  type HeartRate {
    _id: String,
    startDate: String,
    endDate: String, 
    heartRate: Int, 
  }
  
  type StandHour {
   _id: String,
    startDate: String,
    endDate: String, 
    standHour: Float, 
  }
  
  type SmartWatch {
    _id: String,
    _index: String,
    name: String,
    user: String,
    address: String,
    room: String,
    location: String,
    stepCount: [StepCount], 
    heartRate: [HeartRate], 
    exerciseTime: [ExerciseTime], 
    standHour: [StandHour]
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
    sleep(name: String, startDate: String, endDate: String): Sleep,
    smartTable: SmartTable,
    smartWatch(name: String, startDate: String, endDate: String): SmartWatch,
    ipCamera: IPCamera,
    ipfsCamera: IPFSCamera
  }
`);

module.exports = schema;
