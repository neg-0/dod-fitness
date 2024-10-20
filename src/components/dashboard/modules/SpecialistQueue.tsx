import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Users } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const SpecialistQueue: DashboardModule = () => {
  const queue = [
    { name: 'John Doe', reason: 'Fitness Plan Review' },
    { name: 'Jane Smith', reason: 'Nutrition Consultation' },
    { name: 'Mike Johnson', reason: 'Injury Assessment' },
  ];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Specialist Queue
        </Typography>
        <List dense>
          {queue.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={item.reason} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ m: 2 }}>
        View Full Queue
      </Button>
    </Card>
  );
};

SpecialistQueue.moduleMetadata = {
  id: 'specialistQueue',
  title: "Specialist Queue",
  description: "Manage your queue of members waiting for consultations",
  icon: Users,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default SpecialistQueue;