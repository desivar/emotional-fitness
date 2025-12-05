import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Wellness from './pages/Wellness';
import Navigation from './components/Navigation';

// Create a cute theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B8B', // Soft pink
      light: '#FFB6C1',
      dark: '#FF5252',
    },
    secondary: {
      main: '#4A90E2', // Soft blue
      light: '#81D4FA',
      dark: '#1976D2',
    },
    success: {
      main: '#66BB6A',
      light: '#A5D6A7',
    },
    warning: {
      main: '#FFA726',
      light: '#FFD54F',
    },
    background: {
      default: '#FFF9F9', // Very light pink background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#5D4037', // Warm brown
      secondary: '#8D6E63',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

// Main App Layout Component
function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF9F9 0%, #E3F2FD 100%)',
    }}>
      {isAuthenticated && <Navigation />}
      <Box sx={{ 
        pt: isAuthenticated ? 0 : 0, // No padding top if no nav
        pb: 4 
      }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/journal" element={
            <PrivateRoute>
              <Journal />
            </PrivateRoute>
          } />
          <Route path="/insights" element={
            <PrivateRoute>
              <Insights />
            </PrivateRoute>
          } />
          <Route path="/wellness" element={
            <PrivateRoute>
              <Wellness />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Navigate to="/dashboard" />
            </PrivateRoute>
          } />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;