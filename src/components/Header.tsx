import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Dumbbell, Menu as MenuIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Workout Plan', path: '/workout-plan' },
    { label: 'Nutrition Plan', path: '/nutrition-plan' },
    { label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Dumbbell className="mr-2" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DoD Fitness
          </Typography>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {navItems.map((item) => (
                <Button key={item.path} color="inherit" component={Link} to={item.path}>
                  {item.label}
                </Button>
              ))}
              <Button color="inherit" onClick={onLogout}>
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
        onLogout={onLogout}
      />
    </>
  );
};

export default Header;