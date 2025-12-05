const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  gratitude: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }]
});

// Index for efficient queries
JournalSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Journal', JournalSchema);