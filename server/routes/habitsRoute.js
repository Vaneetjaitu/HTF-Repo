const express = require('express');
const router = express.Router();
const Habit = require('../models/habitModel');


router.get('/', function (req, res, next) {
  Habit.find().then(habits => {
    res.status(200).json(habits);
  }).catch(err => {
    res.status(400).json(err);
  })
})

router.get('/id/:id', function (req, res, next) {
  // find by name
  const id = req.params.id;
  return Habit.findById(id)
    .then(habit => {
      res.json(habit);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.get('/title/:title', function (req, res, next) {
  // find by title
  const title = req.params.title;
  return Habit.findOne({ title: title })
    .then(habit => {
      res.json(habit);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.post('/', function(req, res, next) {
  // update post here
  const { title, description, userId } = req.body;
  const habit = new Habit({ title, description, userId });
  
  return habit.save()
    .then(habit => {
      res.status(201).json(habit);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.delete('/:id', function(req, res, next) {
  // update delete here

  const id = req.params.id;

  Habit.findByIdAndDelete(id)
    .then(habit => {
      res.status(204).json(habit);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.patch('/', function(req, res, next) {
  // update patch here
  const { title, description } = req.body;
  
  Habit.findOneAndUpdate({ title }, { description })
    .then(habit => {
      res.status(200).json(habit);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

module.exports = router;
