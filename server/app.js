const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config({path:"./.env"})

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/userRoute');
const habitsRouter = require('./routes/habitsRoute');
const habitsTrackerRouter = require('./routes/habittracker');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/HFT-REPO')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/habits', habitsRouter);
app.use('/api/v1/habittracker', habitsTrackerRouter);

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
