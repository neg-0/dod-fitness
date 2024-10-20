import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const FacilityRecommendations: React.FC = () => {
  const facilities = [
    { name: 'Base Dining Hall', description: 'Today\'s Special: Grilled Chicken with Quinoa' },
    { name: 'Healthy Bites Cafe', description: 'On-base cafe with fresh salads and smoothies' },
    { name: 'Fit Fuel Restaurant', description: 'Off-base restaurant with macro-friendly menu' },
    { name: 'Green Leaf Eatery', description: 'Vegetarian and vegan options available' },
    { name: 'Power Plate Grill', description: 'High-protein meals for muscle building' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dining Facility Recommendations
        </Typography>
        <List>
          {facilities.map((facility, index) => (
            <ListItem key={index}>
              <ListItemText primary={facility.name} secondary={facility.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FacilityRecommendations;