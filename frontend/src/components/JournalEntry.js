import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Slider,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { Add, Mood, SentimentSatisfied, SentimentDissatisfied } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const moodLabels = {
  1: { label: 'Very Low', icon: <SentimentDissatisfied color="error" />, color: '#FF6B6B' },
  2: { label: 'Low', icon: <SentimentDissatisfied color="warning" />, color: '#FFA726' },
  3: { label: 'Neutral', icon: <SentimentSatisfied color="info" />, color: '#4FC3F7' },
  4: { label: 'Good', icon: <Mood color="primary" />, color: '#4A90E2' },
  5: { label: 'Great', icon: <Mood color="success" />, color: '#66BB6A' },
};

const commonTags = ['grateful', 'reflective', 'challenging', 'peaceful', 'energetic'];

const JournalEntry = ({ onEntryAdded }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      mood: 3,
      gratitude: '',
      additionalNotes: '',
    },
  });

  const currentMood = watch('mood');
  const currentMoodData = moodLabels[currentMood];

  const handleTagClick = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const entryData = {
        ...data,
        tags: selectedTags,
      };

      const response = await axios.post(
        'http://localhost:5000/api/journal',
        entryData,
        { headers: { 'x-auth-token': token } }
      );

      onEntryAdded(response.data);
      reset();
      setSelectedTags([]);
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        How are you feeling today?
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mood Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>
            Mood: <strong>{currentMoodData.label}</strong>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            {currentMoodData.icon}
            <Box sx={{ flexGrow: 1 }}>
              <Controller
                name="mood"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={1}
                    max={5}
                    step={1}
                    marks
                    sx={{
                      color: currentMoodData.color,
                      '& .MuiSlider-mark': {
                        backgroundColor: '#fff',
                        border: '2px solid currentColor',
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Stack>
        </Box>

        {/* Gratitude Entry */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>
            What are you grateful for today?
          </Typography>
          <Controller
            name="gratitude"
            control={control}
            rules={{ required: 'Gratitude entry is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={2}
                placeholder="I'm grateful for..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>

        {/* Tags */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Tags</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {commonTags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Box>

        {/* Additional Notes */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Additional Notes (Optional)</Typography>
          <Controller
            name="additionalNotes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={3}
                placeholder="Any other thoughts or reflections..."
              />
            )}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          startIcon={<Add />}
          fullWidth
        >
          Save Journal Entry
        </Button>
      </form>
    </Paper>
  );
};

export default JournalEntry;