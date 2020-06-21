var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

//connect Mongoose, prepare to be used with MongoStore for session persistence
const mongooseConnection = require('./lib/connectMongoose');

// import models // mongoose
require('./models/Item');
require('./models/User');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING || `mongodb://localhost:27017/finaldb`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// import api routes // mongoose
require('./routes/api/itemRoutes')(app);
require('./routes/api/authRoutes')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err.array);
  
  if(err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPIRequest(req) ?
    { message: 'Not Valid', errors: err.mapped() }
    : `Parameter ${errInfo.param} ${err.errInfo.msg}`
  }
  res.status(err.status || 500);

  if(isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

module.exports = app;
