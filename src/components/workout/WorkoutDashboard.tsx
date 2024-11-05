import React from 'react';
import { Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { WorkoutPlan } from '../../api/types';
import { format } from 'date-fns';

interface WorkoutDashboardProps {
  workoutPlans: WorkoutPlan[];
}

const WorkoutDashboard: React.FC<WorkoutDashboardProps> = ({ workoutPlans }) => {
  const calculateProgress = (workoutPlan: WorkoutPlan) => {
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

  const getWorkoutGoal = (workoutPlan: WorkoutPlan) => {
    if (!workoutPlan || !workoutPlan.workouts || workoutPlan.workouts.length === 0) {
      return 'Not specified';
    }
    if (workoutPlan.workouts[0].exercises && workoutPlan.workouts[0].exercises.length > 0) {
      return workoutPlan.workouts[0].exercises[0].name;
    }
    return 'Not specified';
  };

  const getNextWorkoutDate = (workoutPlan: WorkoutPlan) => {
    if (!workoutPlan || !workoutPlan.workouts || workoutPlan.workouts.length === 0) {
      return null;
    }
    const nextDate = workoutPlan.workouts[0].day;
    return nextDate ? new Date(nextDate) : null;
  };

  return (
    <>
      {workoutPlans.length > 0 ? (
        workoutPlans.map((workoutPlan) => {
          const nextWorkoutDate = getNextWorkoutDate(workoutPlan);
          
          return (
            <Card className="mb-4" key={workoutPlan.id}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Workout Dashboard for {workoutPlan.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Goal: {getWorkoutGoal(workoutPlan)} improvement
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Progress:
                </Typography>
                <LinearProgress variant="determinate" value={calculateProgress(workoutPlan)} />
                <Typography variant="body2" className="mt-2">
                  Next workout: {nextWorkoutDate 
                    ? format(nextWorkoutDate, 'dd MMM yyyy')
                    : 'Not scheduled'}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography variant="body1" gutterBottom>
          No workout plans available. Please create a workout plan to see your dashboard.
        </Typography>
      )}
    </>
  );
};

export default WorkoutDashboard;
