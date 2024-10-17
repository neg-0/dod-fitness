import React from 'react';
import { Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { WorkoutPlan } from '../api/types';

interface WorkoutDashboardProps {
  workoutPlan: WorkoutPlan;
}

const WorkoutDashboard: React.FC<WorkoutDashboardProps> = ({ workoutPlan }) => {
  const calculateProgress = () => {
    const totalDays = (new Date(workoutPlan.endDate).getTime() - new Date(workoutPlan.startDate).getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (new Date().getTime() - new Date(workoutPlan.startDate).getTime()) / (1000 * 60 * 60 * 24);
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Workout Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Goal: {workoutPlan.weeklyPlan[0].exercises[0].name} improvement
        </Typography>
        <Typography variant="body2" gutterBottom>
          Progress:
        </Typography>
        <LinearProgress variant="determinate" value={calculateProgress()} />
        <Typography variant="body2" className="mt-2">
          Next workout: {workoutPlan.weeklyPlan[0].day}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkoutDashboard;