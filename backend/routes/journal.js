const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');
const { body, validationResult } = require('express-validator');

// @route   POST api/journal
// @desc    Create a journal entry
// @access  Private
router.post('/', 
  auth,
  [
    body('mood', 'Mood is required').isInt({ min: 1, max: 5 }),
    body('gratitude', 'Gratitude entry is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { mood, gratitude, additionalNotes, tags } = req.body;

      const newEntry = new Journal({
        user: req.user.id,
        mood,
        gratitude,
        additionalNotes: additionalNotes || '',
        tags: tags || []
      });

      const entry = await newEntry.save();
      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/journal
// @desc    Get user's journal entries with date range filter
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const entries = await Journal.find({
      user: req.user.id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal/stats
// @desc    Get mood statistics for charts
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const entries = await Journal.find({
      user: req.user.id,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    const moodTrend = entries.map(entry => ({
      date: entry.date.toISOString().split('T')[0],
      mood: entry.mood,
      gratitude: entry.gratitude
    }));

    const averageMood = entries.length > 0 
      ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
      : 0;

    res.json({
      moodTrend,
      averageMood: parseFloat(averageMood.toFixed(2)),
      totalEntries: entries.length
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;