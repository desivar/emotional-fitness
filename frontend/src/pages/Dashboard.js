import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Avatar, 
  Card, 
  CardContent,
  Chip,
  Stack,
  LinearProgress,
  IconButton
} from '@mui/material';
import { 
  SentimentSatisfiedAlt, 
  Favorite, 
  TrendingUp, 
  Psychology,
  Restaurant,
  SelfImprovement,
  Notifications,
  CalendarToday,
  EmojiEvents,
  WaterDrop,
  FitnessCenter,
  WbSunny,
  LocalFlorist
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Desire');
  const [currentMood, setCurrentMood] = useState(4);
  const [streak, setStreak] = useState(7);
  const [todayEntry, setTodayEntry] = useState(false);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Check if user has made today's entry
    const lastEntry = localStorage.getItem('lastEntryDate');
    const today = new Date().toDateString();
    setTodayEntry(lastEntry === today);
  }, []);

  const moodEmojis = ['😢', '😔', '😐', '🙂', '😄'];
  const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Great'];

  const wellnessTips = [
    { icon: '💧', text: 'Drink 8 glasses of water today', progress: 75 },
    { icon: '🧘', text: '5 minutes of meditation', progress: 60 },
    { icon: '📝', text: 'Write 3 things you\'re grateful for', progress: todayEntry ? 100 : 40 },
    { icon: '🚶', text: 'Take a 15-minute walk', progress: 30 },
    { icon: '🌙', text: '8 hours of sleep', progress: 85 },
  ];

  const recentMoods = [
    { day: 'Mon', mood: 4, emoji: '😊' },
    { day: 'Tue', mood: 5, emoji: '😄' },
    { day: 'Wed', mood: 3, emoji: '🙂' },
    { day: 'Thu', mood: 4, emoji: '😊' },
    { day: 'Fri', mood: 2, emoji: '😔' },
    { day: 'Sat', mood: 5, emoji: '😄' },
    { day: 'Today', mood: 4, emoji: '😊', current: true },
  ];

  const quickActions = [
    { icon: <SentimentSatisfiedAlt />, label: 'Log Mood', color: '#FF6B8B', path: '/journal' },
    { icon: <Favorite />, label: 'Gratitude', color: '#4A90E2', path: '/journal' },
    { icon: <Psychology />, label: 'Reflect', color: '#50E3C2', path: '/journal' },
    { icon: <Restaurant />, label: 'Healthy Tips', color: '#FFA726', path: '/wellness' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#5D4037' }}>
              {greeting}, {userName}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WbSunny fontSize="small" /> It's a beautiful day for self-care
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: '#FF6B8B', 
                width: 56, 
                height: 56,
                boxShadow: '0 4px 12px rgba(255, 107, 139, 0.3)'
              }}
            >
              {userName.charAt(0)}
            </Avatar>
            <IconButton>
              <Notifications />
            </IconButton>
          </Box>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #FFB6C1 0%, #FF6B8B 100%)',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {currentMood}/5
                  </Typography>
                  <Typography variant="body2">Current Mood</Typography>
                </Box>
                <Box sx={{ 
                  fontSize: 40,
                  animation: 'pulse 2s infinite'
                }}>
                  {moodEmojis[currentMood - 1]}
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {streak} 🔥
                  </Typography>
                  <Typography variant="body2">Day Streak</Typography>
                </Box>
                <EmojiEvents sx={{ fontSize: 40 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #81D4FA 0%, #4A90E2 100%)',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    24
                  </Typography>
                  <Typography variant="body2">Entries This Month</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #FFD54F 0%, #FFA726 100%)',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {todayEntry ? '✓' : '!'}
                  </Typography>
                  <Typography variant="body2">Today's Entry</Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 40 }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Mood Tracking & Quick Actions */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Mood Tracker Card */}
            <Paper sx={{ p: 3, borderRadius: 4, mb: 3, bgcolor: '#FFF9C4' }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalFlorist /> Today's Mood Check-in
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  How are you feeling right now?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  {moodEmojis.map((emoji, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={() => setCurrentMood(index + 1)}
                        sx={{
                          fontSize: 40,
                          bgcolor: currentMood === index + 1 ? 'rgba(255, 107, 139, 0.1)' : 'transparent',
                          borderRadius: 3,
                          p: 2,
                          border: currentMood === index + 1 ? '2px solid #FF6B8B' : '2px solid transparent'
                        }}
                      >
                        {emoji}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 1, fontWeight: 600 }}>
                  {moodLabels[currentMood - 1]}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<SentimentSatisfiedAlt />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: '#FF6B8B',
                  '&:hover': { bgcolor: '#FF5252' },
                  fontWeight: 600
                }}
                onClick={() => navigate('/journal')}
              >
                {todayEntry ? 'Update Today\'s Journal' : 'Start Today\'s Journal Entry'}
              </Button>
            </Paper>

            {/* Quick Actions */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FitnessCenter /> Quick Actions
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div whileHover={{ y: -4 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={action.icon}
                      onClick={() => navigate(action.path)}
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        borderColor: action.color,
                        color: action.color,
                        '&:hover': {
                          borderColor: action.color,
                          bgcolor: `${action.color}10`
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Recent Mood Chart */}
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp /> Weekly Mood Summary
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 120, gap: 2, mt: 3 }}>
                {recentMoods.map((day, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {day.day}
                    </Typography>
                    <Box
                      sx={{
                        height: day.mood * 20,
                        bgcolor: day.current ? '#FF6B8B' : '#4A90E2',
                        borderRadius: 2,
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600
                      }}
                    >
                      {day.emoji}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Column - Wellness Tips & Daily Goals */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Daily Wellness Tips */}
            <Paper sx={{ p: 3, borderRadius: 4, mb: 3, bgcolor: '#E3F2FD' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SelfImprovement /> Daily Wellness Goals
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 2 }}>
                {wellnessTips.map((tip, index) => (
                  <Card key={index} variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5">{tip.icon}</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2">{tip.text}</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={tip.progress} 
                            sx={{ 
                              mt: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: tip.progress === 100 ? '#66BB6A' : '#4A90E2'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {tip.progress}%
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>

            {/* Positive Affirmation */}
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #E1BEE7 0%, #BA68C8 100%)',
              color: 'white'
            }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "You are stronger than you seem, braver than you believe, and smarter than you think."
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                - A.A. Milne
              </Typography>
            </Paper>

            {/* Gratitude Reminder */}
            <Paper sx={{ p: 3, borderRadius: 4, mt: 3, bgcolor: '#F1F8E9' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Favorite sx={{ color: '#FF6B8B' }} /> Today's Gratitude Prompt
              </Typography>
              <Typography variant="body2" color="text.secondary">
                What's one small thing that made you smile today?
              </Typography>
              <Button
                variant="text"
                startIcon={<Favorite />}
                sx={{ mt: 2, color: '#FF6B8B' }}
                onClick={() => navigate('/journal')}
              >
                Share your gratitude
              </Button>
            </Paper>

            {/* Hydration Tracker */}
            <Paper sx={{ p: 3, borderRadius: 4, mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WaterDrop sx={{ color: '#4A90E2' }} /> Hydration
                </Typography>
                <Chip label="5/8 glasses" color="primary" size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {[...Array(8)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: 40,
                      bgcolor: index < 5 ? '#4A90E2' : '#E0E0E0',
                      borderRadius: 2,
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Container>
  );
};

export default Dashboard;