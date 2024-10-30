import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Bell } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const Announcements: DashboardModule = () => {
  const announcements = [
    { title: 'New Fitness Equipment', content: 'The gym has been updated with new strength training machines.' },
    { title: 'Nutrition Workshop', content: 'Join us for a nutrition workshop next week to learn about proper fueling for performance.' },
    { title: 'Fitness Test Schedule', content: 'Annual fitness tests will be conducted next month. Prepare accordingly.' },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Announcements
        </Typography>
        <List dense>
          {announcements.map((announcement, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={announcement.title}
                secondary={announcement.content}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

Announcements.moduleMetadata = {
  id: 'announcements',
  title: "Announcements",
  description: "Stay updated with important fitness and nutrition announcements",
  icon: Bell,
  defaultLayout: { w: 2, h: 3, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default Announcements;