import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { NutritionPlan } from '../../api/types';

interface RecipeRecommendationsProps {
  nutritionPlan: NutritionPlan;
}

const mockRecipes = [
  {
    name: 'High-Protein Overnight Oats',
    calories: 350,
    protein: 25,
    prepTime: '10 min',
    tags: ['breakfast', 'high-protein', 'meal-prep'],
  },
  {
    name: 'Grilled Chicken Power Bowl',
    calories: 450,
    protein: 35,
    prepTime: '25 min',
    tags: ['lunch', 'high-protein', 'low-carb'],
  },
  // Add more recipes
];

const RecipeRecommendations: React.FC<RecipeRecommendationsProps> = ({ nutritionPlan }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recommended Recipes
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Based on your nutrition goals and preferences
        </Typography>

        <Grid container spacing={2}>
          {mockRecipes.map((recipe) => (
            <Grid item xs={12} md={6} key={recipe.name}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {recipe.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    Calories: {recipe.calories} kcal | Protein: {recipe.protein}g
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Prep Time: {recipe.prepTime}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecipeRecommendations; 