var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/userRoute');
var habitsRouter = require('./routes/habitsRoute');
const mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/HFT-REPO')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/habits', habitsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = createError(404);
  res.send(err)
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
