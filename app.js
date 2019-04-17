const createError = require('http-errors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db');
const config = require('./config');

const schema = require('./graphql/schema');
const root = require('./graphql/api');

const indexRouter = require('./routes/index');

// Api for orbit db
// const airQualityRouterApi = require('./routes/api/air-quality');

// Thing Description Routes
const airQuality= require('./routes/td/air-quality');
const cushion = require('./routes/td/cushion');
const energyApplianceMonitor = require('./routes/td/energy-appliance-monitor');
const energyMonitor = require('./routes/td/energy-monitor');
const ipCamera = require('./routes/td/ip-camera');
const ipfsCamera = require('./routes/td/ipfs-camera');
const sleep = require('./routes/td/sleep');
const smartTable = require('./routes/td/smart-table');
const smartWatch = require('./routes/td/smart-watch');
const webizingOntology = require('./middleware/webizing-ontology');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/td', indexRouter);
// app.use('/api/airquality', airQualityRouterApi);

// catch 404 and forward to error handler
app.use('/test',async function(req, res, next) {
  const orbitDB = await db.orbitDBStore.getDataStore();

  await orbitDB.load();

  const data = await orbitDB.get('');

  res.send(data);
});

app.use('/td/airquality', airQuality);
app.use('/td/cushion', cushion);
app.use('/td/energyApplianceMonitor', energyApplianceMonitor);
app.use('/td/energyMonitor', energyMonitor);
app.use('/td/ipCamera', ipCamera);
app.use('/td/ipfsCamera', ipfsCamera);
app.use('/td/sleep', sleep);
app.use('/td/smartTable', smartTable);
app.use('/td/smartWatch', smartWatch);


app.use('/', webizingOntology());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, async () => {
  console.log('Server running on port 3000');
  await db.orbitDBStore.startDB(config.db_address);
  console.log(`IPFS is started!`)
});

module.exports = app;
