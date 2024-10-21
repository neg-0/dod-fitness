import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { WorkoutPlan as WorkoutPlanType } from '../api/types';
import WorkoutDashboard from '../components/WorkoutDashboard';
import WorkoutCalendar from '../components/WorkoutCalendar';

const WorkoutPlan: React.FC = () => {
  const { api, fetchWorkoutData } = useApi();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);

  const savedWorkoutPlan = fetchWorkoutData()

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Personalized Workout Plan
      </Typography>
      {workoutPlan && (
        <>
          <WorkoutDashboard workoutPlan={workoutPlan} />
          <WorkoutCalendar workoutPlan={workoutPlan} onUpdateWorkoutPlan={function (updatedPlan: WorkoutPlanType): void {
            throw new Error('Function not implemented.');
          } } />
        </>
      )}
      {!workoutPlan && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="body1" paragraph>
              No workout plan found. Please update your profile to generate a plan.
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkoutPlan;
