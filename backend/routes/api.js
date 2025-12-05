const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

// @route   GET api/external/quotes
// @desc    Get positive quotes
// @access  Private
router.get('/quotes', auth, async (req, res) => {
  try {
    // Using ZenQuotes API (free)
    const response = await axios.get('https://zenquotes.io/api/quotes');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
    
    // Fallback to local quotes if API fails
    const fallbackQuotes = [
      { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
      { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
      { q: "It always seems impossible until it's done.", a: "Nelson Mandela" }
    ];
    res.json(fallbackQuotes);
  }
});

// @route   GET api/external/recipes
// @desc    Get healthy recipes
// @access  Private
router.get('/recipes', auth, async (req, res) => {
  try {
    const { query = 'healthy' } = req.query;
    
    // Using Edamam API (free tier available)
    const APP_ID = process.env.EDAMAM_APP_ID || 'your_app_id';
    const APP_KEY = process.env.EDAMAM_APP_KEY || 'your_app_key';
    
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=5`
    );
    
    res.json(response.data.hits || []);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    
    // Fallback data
    const fallbackRecipes = [
      {
        recipe: {
          label: "Mediterranean Salad",
          image: "https://via.placeholder.com/300",
          calories: 350,
          ingredients: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Olives", "Feta cheese"]
        }
      }
    ];
    res.json(fallbackRecipes);
  }
});

// @route   GET api/external/wellness-tips
// @desc    Get wellness tips
// @access  Private
router.get('/wellness-tips', auth, async (req, res) => {
  try {
    // Using Advice Slip API
    const tips = [];
    for (let i = 0; i < 5; i++) {
      const response = await axios.get('https://api.adviceslip.com/advice');
      tips.push(response.data.slip);
    }
    res.json(tips);
  } catch (error) {
    console.error('Error fetching wellness tips:', error.message);
    
    const fallbackTips = [
      { advice: "Take a 10-minute walk outside each day" },
      { advice: "Practice deep breathing for 5 minutes daily" },
      { advice: "Stay hydrated with 8 glasses of water" }
    ];
    res.json(fallbackTips);
  }
});

module.exports = router;