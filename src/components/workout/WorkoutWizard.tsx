import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { differenceInDays, addDays } from 'date-fns';
import { useApi } from '../../hooks/useApi';

interface WorkoutWizardProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const WorkoutWizard: React.FC<WorkoutWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { api } = useApi();

  const handleGenerateWorkout = async () => {
    if (!api) return;

    setLoading(true);

    if (!startDate || !endDate) {
      throw new Error("Must select a start and end date.");
    }

    // Clamp the end date to a max of 30 days
    let clampedEndDate = endDate;
    if (differenceInDays(endDate, startDate) > 30) {
      clampedEndDate = addDays(startDate, 30);
    }

    try {
      const response = await api.workoutPlanPost({ startDate, endDate, userInput });
      setWorkoutPlan(response.data);
      localStorage.setItem('workoutPlan', JSON.stringify(response.data));

      // Update workout plan based on bot response
      setLoading(false);

      onComplete(response.data);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    }
  };

  const updateWorkoutPlan = (response: string) => {
    // Logic to update the workout plan based on the response
    setWorkoutPlan((prev) => ({
      ...prev,
      details: response, // Example of adding response to the plan
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Let's Create Your Workout Plan!
          </Typography>
          <TextField
            fullWidth
            label="Describe your goals, preferences, and any limitations..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGenerateWorkout();
              }
            }}
          />
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            sx={{ m: 2 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            sx={{ m: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateWorkout}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancel}
            sx={{ mt: 2, ml: '8px' }}
          >
            Cancel
          </Button>
          {workoutPlan && (
            <Box mt={4}>
              <Typography variant="h6">Your Workout Plan:</Typography>
              <Typography variant="body1">{workoutPlan.details}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default WorkoutWizard;
