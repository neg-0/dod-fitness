import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  IconButton,
} from '@mui/material';
import { Plus, X } from 'lucide-react';
import { NutritionPlan } from '../../api/types';

interface MealLoggerProps {
  nutritionPlan: NutritionPlan;
}

const commonFoods = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13 },
  { name: 'Greek Yogurt', calories: 130, protein: 12, carbs: 9, fat: 4 },
  // Add more common foods
];

const MealLogger: React.FC<MealLoggerProps> = ({ nutritionPlan }) => {
  const [selectedFoods, setSelectedFoods] = useState<typeof commonFoods[0][]>([]);
  const [portions, setPortions] = useState<Record<string, number>>({});

  const handleAddFood = (food: typeof commonFoods[0] | null) => {
    if (food) {
      setSelectedFoods([...selectedFoods, food]);
      setPortions({ ...portions, [food.name]: 1 });
    }
  };

  const handleRemoveFood = (foodName: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.name !== foodName));
    const newPortions = { ...portions };
    delete newPortions[foodName];
    setPortions(newPortions);
  };

  const calculateTotals = () => {
    return selectedFoods.reduce(
      (acc, food) => {
        const portion = portions[food.name] || 1;
        return {
          calories: acc.calories + food.calories * portion,
          protein: acc.protein + food.protein * portion,
          carbs: acc.carbs + food.carbs * portion,
          fat: acc.fat + food.fat * portion,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Log Your Meal
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Autocomplete
            options={commonFoods}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => handleAddFood(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Search Foods" fullWidth />
            )}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          {selectedFoods.map((food) => (
            <Box key={food.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Chip label={food.name} />
              <TextField
                type="number"
                label="Portions"
                value={portions[food.name]}
                onChange={(e) => 
                  setPortions({ ...portions, [food.name]: Number(e.target.value) })
                }
                sx={{ mx: 2 }}
                size="small"
              />
              <IconButton onClick={() => handleRemoveFood(food.name)} size="small">
                <X />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Meal Totals:</Typography>
          {Object.entries(calculateTotals()).map(([nutrient, value]) => (
            <Typography key={nutrient} variant="body2">
              {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: {Math.round(value)}
              {nutrient === 'calories' ? ' kcal' : 'g'}
            </Typography>
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<Plus />}
          disabled={selectedFoods.length === 0}
        >
          Log Meal
        </Button>
      </CardContent>
    </Card>
  );
};

export default MealLogger; 