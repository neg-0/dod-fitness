import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import { Dumbbell, Menu as MenuIcon, Bell } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getNavItems = () => {
    const commonItems = [
      { label: 'Profile', path: '/profile' },
      { label: 'Messages', path: '/messages', notifications: 3 },
    ];

    switch (user?.role) {
      case 'UnitLeadership':
        return [
          { label: 'My Dashboard', path: '/dashboard' },
          { label: 'Unit Leadership Dashboard', path: '/unit-leadership' },
          ...commonItems,
        ];
      case 'FitnessSpecialist':
        return [
          { label: 'My Dashboard', path: '/dashboard' },
          { label: 'Fitness Specialist Dashboard', path: '/fitness-specialist' },
          ...commonItems,
        ];
      case 'NutritionSpecialist':
        return [
          { label: 'My Dashboard', path: '/dashboard' },
          { label: 'Nutrition Specialist Dashboard', path: '/nutrition-specialist' },
          ...commonItems,
        ];
      case 'BaseMember':
        return [
          { label: 'My Dashboard', path: '/dashboard' },
          { label: 'Workout Plan', path: '/workout-plan' },
          { label: 'Nutrition Plan', path: '/nutrition-plan' },
          ...commonItems,
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const getHomeLink = () => {
    if (!user) return '/login';
    return '/dashboard';
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            component={Link}
            to={getHomeLink()}
            sx={{ mr: 2 }}
          >
            <Dumbbell />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to={getHomeLink()}
            sx={{
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            DoD Fitness
          </Typography>
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  {item.label}
                  {item.notifications && (
                    <Badge
                      badgeContent={item.notifications}
                      color="secondary"
                      sx={{ ml: 1 }}
                    >
                      <Bell size={16} />
                    </Badge>
                  )}
                </Button>
              ))}
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <MobileMenu
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        navItems={navItems}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;