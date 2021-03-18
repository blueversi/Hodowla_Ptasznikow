var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const tarantulaRouter = require('./routes/tarantulaRoute');
const foodRouter = require('./routes/foodRoute');
const feedingRouter = require('./routes/feedingRoute');
const tarantulaApiRouter = require('./routes/api/TarantulaAPIRoute');
const foodApiRouter = require('./routes/api/FoodAPIRoute');
const feedingApiRouter = require('./routes/api/FeedingAPIRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tarantula', tarantulaRouter);
app.use('/food', foodRouter);
app.use('/feeding', feedingRouter);
app.use('/api/tarantula', tarantulaApiRouter);
app.use('/api/food', foodApiRouter);
app.use('/api/feeding', feedingApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
