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
import { useAuth } from '../contexts/AuthContext';
import { Psychology } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes - in real app, you'd call your backend API
    const mockToken = 'mock-jwt-token';
    const mockUser = { name: 'Desire', email: 'desire@example.com' };
    
    login(mockToken, mockUser);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Psychology sx={{ fontSize: 60, color: '#FF6B8B', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ color: '#5D4037' }}>
          Welcome Back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to continue your emotional wellness journey
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              py: 1.5,
              bgcolor: '#FF6B8B',
              '&:hover': { bgcolor: '#FF5252' }
            }}
          >
            Sign In
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              sx={{ 
                color: '#4A90E2', 
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        {/* Demo Login Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Just want to explore?
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              const mockToken = 'demo-token';
              const mockUser = { name: 'Demo User', email: 'demo@example.com' };
              login(mockToken, mockUser);
              navigate('/dashboard');
            }}
            sx={{ 
              borderColor: '#4A90E2',
              color: '#4A90E2',
              '&:hover': { borderColor: '#1976D2' }
            }}
          >
            Try Demo Mode
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;