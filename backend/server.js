require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test routes
app.get('/', (req, res) => {
  res.json({
    message: '🎉 Emotional Fitness Tracker Backend is Running!',
    status: 'success',
    version: '1.0.0',
    endpoints: {
      test: '/api/test',
      health: '/health',
      docs: 'Coming soon...'
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working perfectly! 🚀',
    data: {
      server: 'Express 5.x',
      database: 'MongoDB',
      author: 'Desire Vargas',
      features: ['Mood Tracking', 'Gratitude Journal', 'Data Visualization']
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Database connection (optional for now)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emotional-fitness';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.log('⚠️ MongoDB Connection Warning (app will still run):', err.message);
    console.log('📝 You can add MongoDB later for full functionality');
  });

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🧠 EMOTIONAL FITNESS TRACKER BACKEND   ║
╚═══════════════════════════════════════════╝
✅ Server running on: http://localhost:${PORT}
📡 API Status: ACTIVE
🛠️  Author: Desire Vargas
📊 Test endpoints:
   • http://localhost:${PORT}/
   • http://localhost:${PORT}/api/test
   • http://localhost:${PORT}/health
🔧 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});