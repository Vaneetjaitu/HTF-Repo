const mongoose = require('mongoose');


const habitTrackerSchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    trackDates: [{
        date: { type: Date, required: true },
        completed: { type: Boolean, default: false }
    }]
});

model.exports = mongoose.model('HabitTracker', habitTrackerSchema);