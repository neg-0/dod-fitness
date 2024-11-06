import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Grid,
  Switch,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useApi } from '../../hooks/useApi';

interface NutritionWizardProps {
  onComplete: (plan: any) => void;
  onCancel: () => void;
}

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (Office/Desk Work)' },
  { value: 'lightlyActive', label: 'Lightly Active (1-2 workouts/week)' },
  { value: 'moderatelyActive', label: 'Moderately Active (3-4 workouts/week)' },
  { value: 'veryActive', label: 'Very Active (5-7 workouts/week)' },
  { value: 'extraActive', label: 'Extra Active (Physical job + workouts)' },
];

const commonAllergies = [
  'Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Soy', 'Wheat', 'Fish', 'Shellfish'
];

const dietaryRestrictions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Kosher', 'Halal', 
  'Low-Carb', 'Low-Fat', 'Mediterranean'
];

const NutritionWizard: React.FC<NutritionWizardProps> = ({ onComplete, onCancel }) => {
  const { api } = useApi();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Goals & Activity
    fitnessGoal: '',
    targetWeight: '',
    weeklyWorkouts: '',
    workoutTypes: [] as string[],
    ptTestDate: '',
    
    // Meal Planning
    mealsPerDay: '3',
    diningFacilityAccess: false,
    mealPrepTime: 'moderate',
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Goals & Activity
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Primary Goal</InputLabel>
              <Select
                value={formData.fitnessGoal}
                onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
              >
                <MenuItem value="weightLoss">Weight Loss</MenuItem>
                <MenuItem value="muscleGain">Muscle Gain</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="performance">Performance</MenuItem>
              </Select>
            </FormControl>
            {formData.fitnessGoal !== 'maintenance' && (
              <TextField
                fullWidth
                label="Target Weight (lbs)"
                type="number"
                value={formData.targetWeight}
                onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                margin="normal"
              />
            )}
            <TextField
              fullWidth
              label="Next PT Test Date (optional)"
              type="date"
              value={formData.ptTestDate}
              onChange={(e) => setFormData({ ...formData, ptTestDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </>
        );

      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Dietary Preferences
            </Typography>
            <Autocomplete
              multiple
              options={dietaryRestrictions}
              value={formData.dietaryRestrictions}
              onChange={(_, newValue) => setFormData({ ...formData, dietaryRestrictions: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Dietary Restrictions" margin="normal" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
            />
            <Autocomplete
              multiple
              options={commonAllergies}
              value={formData.allergies}
              onChange={(_, newValue) => setFormData({ ...formData, allergies: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Allergies" margin="normal" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
            />
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.diningFacilityAccess}
                    onChange={(e) => setFormData({ ...formData, diningFacilityAccess: e.target.checked })}
                  />
                }
                label="I have access to military dining facilities"
              />
            </FormControl>
          </>
        );
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const profile = await api.profileGet();
      const requestData = {
        personalInfo: {
          age: profile.age,
          gender: profile.gender,
          height: profile.height,
          currentWeight: profile.currentWeight,
          targetWeight: Number(formData.targetWeight),
          activityLevel: profile.activityLevel,
          ptTestDate: formData.ptTestDate || undefined,
        },
        fitnessGoals: {
          primary: formData.fitnessGoal,
          targetWeight: Number(formData.targetWeight),
          weeklyWorkouts: Number(formData.weeklyWorkouts),
        },
        dietaryInfo: {
          restrictions: profile.dietaryRestrictions,
          allergies: profile.allergies,
          mealsPerDay: Number(formData.mealsPerDay),
          diningFacilityAccess: formData.diningFacilityAccess,
        },
      };

      const response = await api.nutritionPlanPost(requestData);
      onComplete(response.data);
    } catch (error) {
      console.error('Error generating nutrition plan:', error);
      setError('Failed to generate nutrition plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Generating your personalized nutrition plan...</Typography>
          </Box>
        ) : (
          <>
            {renderStep()}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={onCancel}>Cancel</Button>
              <div>
                {step > 1 && (
                  <Button onClick={() => setStep(step - 1)} sx={{ mr: 1 }}>
                    Previous
                  </Button>
                )}
                {step < 2 ? (
                  <Button variant="contained" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Generate Plan
                  </Button>
                )}
              </div>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionWizard;