import React from 'react';
import { Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { WorkoutPlan } from '../../api/types';
import { format, startOfDay, isAfter, addDays } from 'date-fns';

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
    if (!workoutPlan || !workoutPlan.goal) {
      return 'Not specified';
    }
    return workoutPlan.goal;
  };

  const getNextWorkoutDate = (workoutPlan: WorkoutPlan) => {
    if (!workoutPlan || !workoutPlan.workouts || workoutPlan.workouts.length === 0) {
      return null;
    }
    
    const today = startOfDay(new Date());
    const futureWorkouts = workoutPlan.workouts
      .filter(workout => isAfter(new Date(workout.day), today))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

    // Add 1 day to compensate for timezone
    const nextWorkoutDate = addDays(new Date(futureWorkouts[0].day), 1);

    return nextWorkoutDate;
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
                  Goal: {getWorkoutGoal(workoutPlan)}
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
