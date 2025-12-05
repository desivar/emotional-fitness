import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu, 
  Home, 
  Book, 
  TrendingUp, 
  Restaurant,
  ExitToApp,
  Psychology
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { text: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { text: 'Journal', icon: <Book />, path: '/journal' },
    { text: 'Insights', icon: <TrendingUp />, path: '/insights' },
    { text: 'Wellness', icon: <Restaurant />, path: '/wellness' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'white', 
          color: '#5D4037',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              <Psychology sx={{ fontSize: 32, color: '#FF6B8B' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#5D4037' }}>
                Emotional<span style={{ color: '#4A90E2' }}>Fitness</span>
              </Typography>
            </Box>
          </motion.div>

          {/* Navigation Links (Desktop) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <motion.div key={item.text} whileHover={{ y: -2 }}>
                  <Button
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: '#5D4037',
                      borderRadius: 3,
                      px: 3,
                      '&:hover': {
                        bgcolor: 'rgba(255, 107, 139, 0.1)',
                        color: '#FF6B8B'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <Menu sx={{ color: '#5D4037' }} />
            </IconButton>
          )}

          {/* User Profile */}
          {!isMobile && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  borderColor: '#FF6B8B',
                  color: '#FF6B8B',
                  '&:hover': {
                    borderColor: '#FF5252',
                    bgcolor: 'rgba(255, 107, 139, 0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </motion.div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#FFF9F9',
            borderRadius: '20px 0 0 20px'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Psychology sx={{ fontSize: 32, color: '#FF6B8B' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#5D4037' }}>
              Emotional Fitness
            </Typography>
          </Box>
          
          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.text} 
                button 
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255, 107, 139, 0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#FF6B8B' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: 600, color: '#5D4037' }}
                />
              </ListItem>
            ))}
          </List>

          <Button
            fullWidth
            variant="contained"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
            sx={{
              mt: 4,
              borderRadius: 3,
              bgcolor: '#FF6B8B',
              '&:hover': { bgcolor: '#FF5252' }
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;