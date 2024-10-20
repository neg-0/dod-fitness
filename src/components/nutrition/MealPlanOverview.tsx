import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { NutritionPlan } from '../../api/types';

interface MealPlanOverviewProps {
  nutritionPlan: NutritionPlan;
}

const MealPlanOverview: React.FC<MealPlanOverviewProps> = ({ nutritionPlan }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Daily Meal Plan
        </Typography>
        <Typography variant="body1">
          Daily Calories: {nutritionPlan.dailyCalories} kcal
        </Typography>
        <Typography variant="body2" gutterBottom>
          Macronutrients: Protein {nutritionPlan.macronutrients.protein}g, 
          Carbs {nutritionPlan.macronutrients.carbohydrates}g, 
          Fat {nutritionPlan.macronutrients.fat}g
        </Typography>
        <List>
          {nutritionPlan.meals.map((meal, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={meal.name}
                secondary={meal.foods.map(food => 
                  `${food.name}: ${food.amount} (${food.calories} kcal)`
                ).join(', ')}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default MealPlanOverview;