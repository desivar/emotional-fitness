import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Favorite,
  Refresh,
  Restaurant,
  FitnessCenter,
  SelfImprovement,
} from '@mui/icons-material';
import axios from 'axios';

const WellnessTips = () => {
  const [quotes, setQuotes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState({
    quotes: false,
    recipes: false,
    tips: false,
  });

  useEffect(() => {
    fetchQuotes();
    fetchRecipes();
    fetchWellnessTips();
  }, []);

  const fetchQuotes = async () => {
    setLoading(prev => ({ ...prev, quotes: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/external/quotes',
        { headers: { 'x-auth-token': token } }
      );
      setQuotes(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(prev => ({ ...prev, quotes: false }));
    }
  };

  const fetchRecipes = async () => {
    setLoading(prev => ({ ...prev, recipes: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/external/recipes?query=healthy',
        { headers: { 'x-auth-token': token } }
      );
      setRecipes(response.data.slice(0, 2));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(prev => ({ ...prev, recipes: false }));
    }
  };

  const fetchWellnessTips = async () => {
    setLoading(prev => ({ ...prev, tips: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/external/wellness-tips',
        { headers: { 'x-auth-token': token } }
      );
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching wellness tips:', error);
    } finally {
      setLoading(prev => ({ ...prev, tips: false }));
    }
  };

  return (
    <Box>
      {/* Daily Inspiration */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SelfImprovement /> Daily Inspiration
          </Typography>
          <Button
            startIcon={<Refresh />}
            onClick={fetchQuotes}
            disabled={loading.quotes}
            size="small"
          >
            Refresh
          </Button>
        </Box>

        {loading.quotes ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {quotes.map((quote, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', bgcolor: '#f8f9fa' }}>
                  <CardContent>
                    <Typography variant="body1" fontStyle="italic" gutterBottom>
                      "{quote.q || quote.quote}"
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      — {quote.a || quote.author || 'Unknown'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Healthy Recipes */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Restaurant /> Healthy Recipes
          </Typography>
          <Button
            startIcon={<Refresh />}
            onClick={fetchRecipes}
            disabled={loading.recipes}
            size="small"
          >
            New Recipes
          </Button>
        </Box>

        {loading.recipes ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {recipes.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.recipe?.image || 'https://via.placeholder.com/300x140'}
                    alt={item.recipe?.label}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.recipe?.label}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        size="small"
                        label={`${Math.round(item.recipe?.calories || 0)} cal`}
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Ingredients:</strong>{' '}
                      {item.recipe?.ingredients?.slice(0, 3).map(i => i.text).join(', ')}
                      {item.recipe?.ingredients?.length > 3 ? '...' : ''}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Wellness Tips */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <FitnessCenter /> Wellness Tips
        </Typography>

        {loading.tips ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {tips.map((tip, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      {tip.advice}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <IconButton size="small" color="primary">
                        <Favorite fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default WellnessTips;