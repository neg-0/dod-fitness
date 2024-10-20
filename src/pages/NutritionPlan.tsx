import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { NutritionPlan as NutritionPlanType } from '../api/types';
import MealPlanOverview from '../components/nutrition/MealPlanOverview';
import NutritionTracker from '../components/nutrition/NutritionTracker';
import RecipeSuggestions from '../components/nutrition/RecipeSuggestions';
import SupplementTracker from '../components/nutrition/SupplementTracker';
import HydrationTracker from '../components/nutrition/HydrationTracker';
import FacilityRecommendations from '../components/nutrition/FacilityRecommendations';
import DiningFacilityMenu from '../components/nutrition/DiningFacilityMenu';

const NutritionPlan: React.FC = () => {
  const { api } = useApi();
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('nutritionPlan');
    if (savedPlan) {
      setNutritionPlan(JSON.parse(savedPlan));
    } else {
      generateNutritionPlan();
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
      {!nutritionPlan && (
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
      )}
      {nutritionPlan && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MealPlanOverview nutritionPlan={nutritionPlan} />
          </Grid>
          <Grid item xs={12} md={6}>
            <NutritionTracker nutritionPlan={nutritionPlan} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipeSuggestions />
          </Grid>
          <Grid item xs={12} md={6}>
            <FacilityRecommendations />
          </Grid>
          <Grid item xs={12} md={6}>
            <SupplementTracker />
          </Grid>
          <Grid item xs={12} md={6}>
            <HydrationTracker />
          </Grid>
          <Grid item xs={12}>
            <DiningFacilityMenu />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default NutritionPlan;