import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, LinearProgress } from '@mui/material';
import { NutritionPlan } from '../../api/types';

interface NutritionTrackerProps {
  nutritionPlan: NutritionPlan;
}

const NutritionTracker: React.FC<NutritionTrackerProps> = ({ nutritionPlan }) => {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Nutrition data submitted:', { calories, protein, carbs, fat });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Daily Nutrition Tracker
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Protein (g)"
            type="number"
            value={protein}
            onChange={(e) => setProtein(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Carbs (g)"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fat (g)"
            type="number"
            value={fat}
            onChange={(e) => setFat(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Log Nutrition
          </Button>
        </form>
        <Typography variant="subtitle1" gutterBottom className="mt-4">
          Progress
        </Typography>
        <Typography variant="body2">Calories</Typography>
        <LinearProgress variant="determinate" value={(calories / nutritionPlan.dailyCalories) * 100} />
        <Typography variant="body2">Protein</Typography>
        <LinearProgress variant="determinate" value={(protein / nutritionPlan.macronutrients.protein) * 100} />
        <Typography variant="body2">Carbs</Typography>
        <LinearProgress variant="determinate" value={(carbs / nutritionPlan.macronutrients.carbohydrates) * 100} />
        <Typography variant="body2">Fat</Typography>
        <LinearProgress variant="determinate" value={(fat / nutritionPlan.macronutrients.fat) * 100} />
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;