import React from 'react';
import { Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { WorkoutPlan } from '../../api/types';

interface WorkoutDashboardProps {
  workoutPlan: WorkoutPlan | null;
}

const WorkoutDashboard: React.FC<WorkoutDashboardProps> = ({ workoutPlan }) => {
  const calculateProgress = () => {
    if (!workoutPlan) return 0;

    const totalDays =
      (new Date(workoutPlan.endDate).getTime() -
        new Date(workoutPlan.startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    const daysPassed =
      (new Date().getTime() - new Date(workoutPlan.startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  const getWorkoutGoal = () => {
    if (!workoutPlan || !workoutPlan.weeklyPlan || workoutPlan.weeklyPlan.length === 0) {
      return 'Not specified';
    }
    if (workoutPlan.weeklyPlan[0].exercises && workoutPlan.weeklyPlan[0].exercises.length > 0) {
      return workoutPlan.weeklyPlan[0].exercises[0].name;
    }
    return 'Not specified';
  };

  const getNextWorkoutDate = () => {
    if (!workoutPlan || !workoutPlan.weeklyPlan || workoutPlan.weeklyPlan.length === 0) {
      return 'Not scheduled';
    }
    return workoutPlan.weeklyPlan[0].day;
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Workout Dashboard
        </Typography>
        {workoutPlan ? (
          <>
            <Typography variant="body1" gutterBottom>
              Goal: {getWorkoutGoal()} improvement
            </Typography>
            <Typography variant="body2" gutterBottom>
              Progress:
            </Typography>
            <LinearProgress variant="determinate" value={calculateProgress()} />
            <Typography variant="body2" className="mt-2">
              Next workout: {getNextWorkoutDate()}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" gutterBottom>
            No workout plan available. Please create a workout plan to see your dashboard.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutDashboard;
