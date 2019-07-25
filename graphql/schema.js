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
    sleepAnalysis: [SleepAnalysis]
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
  
  type StepCount {
    startDate: String,
    endDate: String, 
    stepCount: Int, 
  }
  
  type SleepAnalysis {
    startDate: String,
    endDate: String, 
    status: String, 
  }
  
  type ExerciseTime {
    startDate: String,
    endDate: String, 
    exerciseTime: Int, 
  }
  
  type HeartRate {
    startDate: String,
    endDate: String, 
    heartRate: Int, 
  }
  
  type StandHour {
    startDate: String,
    endDate: String, 
    standHour: Float, 
  }
  
  type SmartWatch {
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
   
  enum OrderBy {
    TIME
  } 
   
  type Query {
    airQuality(names: [String]): [AirQuality],
    airQualityList(names: [String], orderBy: OrderBy): [AirQuality],
    
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
