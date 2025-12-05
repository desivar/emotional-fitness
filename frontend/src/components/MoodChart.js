import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from 'recharts';
import { Box, Paper, Typography, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';

const MoodChart = () => {
  const [timeRange, setTimeRange] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchMoodData();
  }, [timeRange]);

  const fetchMoodData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/journal/stats?days=${timeRange}`,
        { headers: { 'x-auth-token': token } }
      );

      setChartData(response.data.moodTrend);
      setStats({
        averageMood: response.data.averageMood,
        totalEntries: response.data.totalEntries,
      });
    } catch (error) {
      console.error('Error fetching mood data:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">
            <strong>Date:</strong> {label}
          </Typography>
          <Typography variant="body2">
            <strong>Mood:</strong> {payload[0].value}/5
          </Typography>
          {payload[1] && (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              "{payload[1].value}"
            </Typography>
          )}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Mood Trends</Typography>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          size="small"
        >
          <MenuItem value={7}>Last 7 days</MenuItem>
          <MenuItem value={30}>Last 30 days</MenuItem>
          <MenuItem value={90}>Last 90 days</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis domain={[1, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="mood"
                  name="Mood Level"
                  stroke="#4A90E2"
                  fill="#4A90E2"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4A90E2"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-7).reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={false} />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Bar 
                  dataKey="mood" 
                  name="Daily Mood" 
                  fill="#50E3C2" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography color="textSecondary" variant="body2">
              Average Mood
            </Typography>
            <Typography variant="h4" color="primary">
              {stats.averageMood?.toFixed(1) || '0.0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              / 5.0
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography color="textSecondary" variant="body2">
              Total Entries
            </Typography>
            <Typography variant="h4" color="secondary">
              {stats.totalEntries || 0}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography color="textSecondary" variant="body2">
              Current Streak
            </Typography>
            <Typography variant="h4" color="success.main">
              7
            </Typography>
            <Typography variant="caption" color="textSecondary">
              days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography color="textSecondary" variant="body2">
              Best Mood
            </Typography>
            <Typography variant="h4" color="warning.main">
              {chartData.length > 0 ? Math.max(...chartData.map(d => d.mood)) : 0}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              / 5.0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MoodChart;