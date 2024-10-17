import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home, Dumbbell, Utensils, User, LogOut } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, navItems, onLogout }) => {
  const getIcon = (label: string) => {
    switch (label) {
      case 'Home':
        return <Home />;
      case 'Workout Plan':
        return <Dumbbell />;
      case 'Nutrition Plan':
        return <Utensils />;
      case 'Profile':
        return <User />;
      default:
        return null;
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        {navItems.map((item) => (
          <ListItem button key={item.path} component={Link} to={item.path}>
            <ListItemIcon>{getIcon(item.label)}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={onLogout}>
          <ListItemIcon><LogOut /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MobileMenu;