const express = require('express');
const HabitTracker = require("../models/habitsTrackerModel");
const Habit = require('../models/habitModel');
const router = express.Router();

// Route for marking habit completion
router.post('/markcompletion', async (req, res) => {
    const { habitId, userId, date, status } = req.body; 

    try {
        // Check if the habit tracker already exists for this user and habit
        let habitTracker = await HabitTracker.findOne({ habit: habitId, user: userId });

        if (!habitTracker) {
            // If no habit tracker exists, create a new one
            habitTracker = new HabitTracker({
                habit: habitId,
                user: userId,
                trackDates: [{ date, status }]  
            });

            await habitTracker.save(); 
            return res.status(201).json({ message: 'New habit tracker created and completion marked', habitTracker });
        } else {
            // If habit tracker exists, check if the date is already in trackDates
            const existingDate = habitTracker.trackDates.find((entry) => entry.date.toDateString() === new Date(date).toDateString());

            if (existingDate) {
                existingDate.status = status;
            } else {
                habitTracker.trackDates.push({ date, status });
            }

            
            if (status === 'completed') {
                const habit = await Habit.findById(habitId);
                const previousDate = new Date(date);
                previousDate.setDate(previousDate.getDate() - 1); 

                const previousTrack = habitTracker.trackDates.find(entry => new Date(entry.date).toDateString() === previousDate.toDateString());

                if (previousTrack && previousTrack.status === 'completed') {
                    habit.streakCount += 1;
                } else {
                    habit.streakCount = 1; // Start new streak from 1 if missed the previous day
                }

                await habit.save(); 
            } else if (status === 'missed') {
                const habit = await Habit.findById(habitId);
                habit.streakCount = 0; 
                await habit.save();
            }

            
            await habitTracker.save();
            res.status(200).json({ message: 'Habit status updated', habitTracker });
        }
    } catch (error) {
        console.error('Error marking habit completion:', error);
        return res.status(500).json({ message: 'Error marking habit completion', error });
    }
});


router.get('/trackprogress', async (req, res) => {
    const { habitId, userId } = req.query;

    try {
        const habitTracker = await HabitTracker.findOne({ habit: habitId, user: userId });

        if (!habitTracker) {
            return res.status(404).json({ message: 'No habit tracker found for this user and habit' });
        }
        res.status(200).json({ message: 'Habit tracker found', trackDates: habitTracker.trackDates });
    } catch (error) {
        console.error('Error fetching habit tracker progress:', error);
        res.status(500).json({ message: 'Error fetching habit tracker progress', error });
    }
})

router.get('/habitdetails', async (req, res) => {
    const { habitId } = req.query;

    try {
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.status(200).json({ message: 'Habit details found', habit });
    } catch (error) {
        console.error('Error fetching habit details:', error);
        res.status(500).json({ message: 'Error fetching habit details', error });
    }
});
module.exports = router;

