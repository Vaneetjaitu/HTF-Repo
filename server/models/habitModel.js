const mongoose = require('mongoose');

const Habit = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    streakCount: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalDays: { type: Number, required: true, default: 0 },
    istodayDone: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Habit', Habit);