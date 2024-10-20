import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Utensils } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const NutritionPlan: DashboardModule<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const nutritionPlan = {
    calories: 2500,
    macros: { protein: 30, carbs: 50, fat: 20 },
    meals: [
      { name: 'Breakfast', calories: 500 },
      { name: 'Lunch', calories: 700 },
      { name: 'Dinner', calories: 800 },
      { name: 'Snacks', calories: 500 },
    ],
  };

  const macroData = Object.entries(nutritionPlan.macros).map(([name, value]) => ({ name, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const renderSmall = () => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Typography variant="h6">{nutritionPlan.calories} kcal</Typography>
      <Typography variant="body2">Daily Goal</Typography>
    </Box>
  );

  const renderMedium = () => (
    <>
      <Typography variant="h6" gutterBottom>Daily Nutrition Plan</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body1">Calories: {nutritionPlan.calories}</Typography>
        <Button variant="outlined" size="small">Log Meal</Button>
      </Box>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={macroData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
          >
            {macroData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );

  const renderLarge = () => (
    <>
      {renderMedium()}
      <Typography variant="subtitle1" gutterBottom>Meal Plan</Typography>
      <List dense>
        {nutritionPlan.meals.map((meal, index) => (
          <ListItem key={index}>
            <ListItemText primary={meal.name} secondary={`${meal.calories} kcal`} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Card sx={{ height: '100%', overflow: 'auto' }}>
      <CardContent>
        {size === 'small' && renderSmall()}
        {size === 'medium' && renderMedium()}
        {size === 'large' && renderLarge()}
      </CardContent>
    </Card>
  );
};

NutritionPlan.moduleMetadata = {
  id: 'nutritionPlan',
  title: "Nutrition Plan",
  description: "View your daily nutrition plan and macronutrient breakdown",
  icon: Utensils,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'NutritionSpecialist'] as UserRole[],
};

export default NutritionPlan;