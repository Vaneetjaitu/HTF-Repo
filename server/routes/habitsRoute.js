var express = require('express');
var router = express.Router();
const Habit = require('../models/habitModel');

router.get('/', function (req, res, next) {
  Habit.find().then(habits => {
    console.log("hello1");
    res.status(200).send(habits);
    console.log("hello");
  }).catch(err => {
    res.status(400).send(err);
  })
})

router.get('/id/:id', function (req, res, next) {
  // find by name
  const id = req.params.id;
  return Habit.findById(id)
    .then(habit => {
      res.send(habit);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.get('/name/:name', function (req, res, next) {
  // find by name
  const name = req.params.name;
  return Habit.findOne({ name })
    .then(habit => {
      res.send(habit);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.post('/', function(req, res, next) {
  // update post here
  const { name, description } = req.body;

  const habit = new Habit({ name, description });
  return habit.save()
    .then(habit => {
      res.status(201).send(habit);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.delete('/:id', function(req, res, next) {
  // update delete here

  const id = req.params.id;

  Habit.findByIdAndDelete(id)
    .then(habit => {
      res.status(204).send(habit);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.patch('/', function(req, res, next) {
  // update patch here
  const { name, description } = req.body;

  Habit.findOneAndUpdate({ name }, { description })
    .then(habit => {
      res.status(200).send(habit);
  })
  .catch(err => {
    res.status(400).send(err);
  })
});

module.exports = router;
