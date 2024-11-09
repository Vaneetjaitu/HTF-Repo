const mongoose = require('mongoose');

const Habit = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    streakCount: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Habit', Habit);