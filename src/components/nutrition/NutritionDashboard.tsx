import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { NutritionPlan } from '../../api/types';

interface NutritionDashboardProps {
  nutritionPlan: NutritionPlan;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const NutritionDashboard: React.FC<NutritionDashboardProps> = ({ nutritionPlan }) => {
  if (!nutritionPlan || !nutritionPlan.meals) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            No nutrition plan data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Transform nutrition plan data for charts
  const macroData = [
    { name: 'Protein', value: nutritionPlan.protein || 0 },
    { name: 'Carbs', value: nutritionPlan.carbohydrates || 0 },
    { name: 'Fat', value: nutritionPlan.fat || 0 },
  ];

  const calculateTotalCalories = () => {
    if (!nutritionPlan.meals) return 0;
    return nutritionPlan.meals.reduce((total, meal) => {
      if (!meal.foods) return total;
      return total + meal.foods.reduce((mealTotal, food) => mealTotal + (food.calories || 0), 0);
    }, 0);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary">
                Calories: {calculateTotalCalories()} / {nutritionPlan.dailyCalories || 0} kcal
              </Typography>
              <LinearProgress
                variant="determinate"
                value={((calculateTotalCalories() / (nutritionPlan.dailyCalories || 1)) * 100) || 0}
                sx={{ mt: 1 }}
              />
            </Box>
            <Typography variant="subtitle2" gutterBottom>
              Macronutrient Distribution
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}g`}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Today's Meals
            </Typography>
            <List>
              {(nutritionPlan.meals || []).map((meal, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={meal.name}
                    secondary={
                      <>
                        {(meal.foods || []).map(food => 
                          `${food.name || ''}: ${food.amount || ''} (${food.calories || 0} kcal)`
                        ).join(', ')}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NutritionDashboard; 