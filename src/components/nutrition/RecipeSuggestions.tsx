import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const RecipeSuggestions: React.FC = () => {
  const recipes = [
    { name: 'Grilled Chicken Salad', description: 'A healthy and protein-rich salad' },
    { name: 'Quinoa Bowl', description: 'Nutrient-dense bowl with vegetables and lean protein' },
    { name: 'Baked Salmon with Roasted Vegetables', description: 'Omega-3 rich meal with fiber-packed veggies' },
    { name: 'Turkey and Avocado Wrap', description: 'High-protein wrap with healthy fats' },
    { name: 'Greek Yogurt Parfait', description: 'Protein-rich snack with fruits and nuts' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Healthy Recipe Suggestions
        </Typography>
        <List>
          {recipes.map((recipe, index) => (
            <ListItem key={index}>
              <ListItemText primary={recipe.name} secondary={recipe.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecipeSuggestions;