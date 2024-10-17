import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { NutritionPlan as NutritionPlanType } from '../api/types';

const NutritionPlan: React.FC = () => {
  const { api } = useApi();
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('nutritionPlan');
    if (savedPlan) {
      setNutritionPlan(JSON.parse(savedPlan));
    }
  }, []);

  const generateNutritionPlan = async () => {
    if (!api) return;

    setLoading(true);
    try {
      const response = await api.nutritionPlanPost({
        goal: 'maintenance',
        dietaryRestrictions: [],
      });
      setNutritionPlan(response.data);
      localStorage.setItem('nutritionPlan', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error generating nutrition plan:', error);
      alert('Failed to generate nutrition plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Personalized Nutrition Plan
      </Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="body1" paragraph>
            Generate a nutrition plan tailored to your fitness goals and dietary requirements.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={generateNutritionPlan}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Nutrition Plan'}
          </Button>
        </CardContent>
      </Card>
      {nutritionPlan && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              Your Daily Nutrition Plan
            </Typography>
            <Typography variant="body1">
              Daily Calories: {nutritionPlan.dailyCalories} kcal
            </Typography>
            <Typography variant="body1" gutterBottom>
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
      )}
    </div>
  );
};

export default NutritionPlan;