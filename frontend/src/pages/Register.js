import React from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Psychology } from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, you'd call your backend API
    navigate('/login'); // Redirect to login after "registration"
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Psychology sx={{ fontSize: 60, color: '#FF6B8B', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ color: '#5D4037' }}>
          Join Our Community 🌱
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Start your emotional wellness journey today
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              py: 1.5,
              bgcolor: '#4A90E2',
              '&:hover': { bgcolor: '#1976D2' }
            }}
          >
            Create Account
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link 
              href="/login" 
              sx={{ 
                color: '#FF6B8B', 
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;