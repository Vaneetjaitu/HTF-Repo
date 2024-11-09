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

const DB = process.env.MONGODB_URL || 'mongodb://localhost:27017/HFT-REPO';
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB conn is successfull!');
  });

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/habits', habitsRouter);
app.use('/api/v1/habittracker', habitsTrackerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = createError(404);
  res.send("error");
});

// error handler
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 💥 shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});