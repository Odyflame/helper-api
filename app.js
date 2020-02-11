var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

//const parsesrt = require('./bin/scripts/parseSMI');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const teacherRouter = require('./routes/teacher');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const movieParser = bodyParser.urlencoded({extended: false});
app.use(express.static('static'));

//app.use('/', parsesrt);

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', movieRouter);
app.use('/', teacherRouter);

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

module.exports = app;
