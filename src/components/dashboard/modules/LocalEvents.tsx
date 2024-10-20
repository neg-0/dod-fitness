import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Calendar } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const LocalEvents: DashboardModule = () => {
  const events = [
    { name: 'Base 5K Run', date: '2023-05-20', location: 'Main Track' },
    { name: 'Fitness Challenge', date: '2023-05-25', location: 'Gym' },
    { name: 'Nutrition Seminar', date: '2023-05-30', location: 'Conference Room' },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Local Fitness Events
        </Typography>
        <List dense>
          {events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={event.name}
                secondary={`${event.date} - ${event.location}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

LocalEvents.moduleMetadata = {
  id: 'localEvents',
  title: "Local Events",
  description: "View upcoming fitness events in your area",
  icon: Calendar,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default LocalEvents;