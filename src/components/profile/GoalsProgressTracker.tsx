import React from 'react';
import { Typography, Card, CardContent, LinearProgress, Grid } from '@mui/material';
import { Profile } from '../../api/types';

interface GoalsProgressTrackerProps {
  profileData: Profile;
}

const GoalsProgressTracker: React.FC<GoalsProgressTrackerProps> = ({ profileData }) => {
  // This is a placeholder for actual progress calculation
  const calculateProgress = (goal: string) => {
    // In a real application, this would be based on actual user data
    return Math.floor(Math.random() * 100);
  };

  const renderGoalProgress = (goal: string) => (
    <Grid item xs={12} sm={6} md={4} key={goal}>
      <Typography variant="subtitle1" gutterBottom>
        {goal}
      </Typography>
      <LinearProgress variant="determinate" value={calculateProgress(goal)} />
      <Typography variant="body2" color="textSecondary">
        {calculateProgress(goal)}% Complete
      </Typography>
    </Grid>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Goals and Progress Tracker
        </Typography>
        <Grid container spacing={3}>
          {profileData.fitnessGoals && profileData.fitnessGoals.split(',').map(goal => renderGoalProgress(goal.trim()))}
          {profileData.nutritionGoals && profileData.nutritionGoals.split(',').map(goal => renderGoalProgress(goal.trim()))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GoalsProgressTracker;