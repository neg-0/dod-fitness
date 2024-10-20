import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Apple } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const NutritionRecommendations: DashboardModule = () => {
  const recommendations = [
    'Increase protein intake to support muscle growth',
    'Add more leafy greens for improved micronutrient profile',
    'Consider omega-3 supplements for joint health',
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Nutrition Recommendations
        </Typography>
        <List dense>
          {recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

NutritionRecommendations.moduleMetadata = {
  id: 'nutritionRecommendations',
  title: "Nutrition Recommendations",
  description: "Get personalized nutrition advice",
  icon: Apple,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'NutritionSpecialist'] as UserRole[],
};

export default NutritionRecommendations;