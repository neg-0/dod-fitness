import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { NutritionPlan as NutritionPlanType } from '../api/types';
import NutritionWizard from '../components/nutrition/NutritionWizard';
import NutritionDashboard from '../components/nutrition/NutritionDashboard';
import DiningFacilityMenu from '../components/nutrition/DiningFacilityMenu';
import MealLogger from '../components/nutrition/MealLogger';
import RecipeRecommendations from '../components/nutrition/RecipeRecommendations';

const NutritionPlan: React.FC = () => {
  const { api } = useApi();
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanType | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    api?.nutritionPlanGet().then((response) => {
      console.log(response.data);
      setNutritionPlan(response.data);
    });
  }, []);

  const handleWizardComplete = (plan: NutritionPlanType) => {
    setNutritionPlan(plan);
    setShowWizard(false);
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Personalized Nutrition Plan
      </Typography>
      
      {!nutritionPlan && !showWizard && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="body1" paragraph>
              Create a personalized nutrition plan tailored to your fitness goals
              and dietary requirements.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowWizard(true)}
            >
              Create Nutrition Plan
            </Button>
          </CardContent>
        </Card>
      )}

      {showWizard && (
        <NutritionWizard
          onComplete={handleWizardComplete}
          onCancel={() => setShowWizard(false)}
        />
      )}

      {nutritionPlan && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <NutritionDashboard nutritionPlan={nutritionPlan} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MealLogger nutritionPlan={nutritionPlan} />
          </Grid>
          <Grid item xs={12}>
            <DiningFacilityMenu />
          </Grid>
          <Grid item xs={12}>
            <RecipeRecommendations nutritionPlan={nutritionPlan} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default NutritionPlan;