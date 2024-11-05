import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { WorkoutPlan as WorkoutPlanType } from '../api/types';
import WorkoutWizard from '../components/workout/WorkoutWizard';
import WorkoutCalendar from '../components/workout/WorkoutCalendar';
import WorkoutDashboard from '../components/workout/WorkoutDashboard';

const WorkoutPlan: React.FC = () => {
  const { api } = useApi();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanType[]>([]);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<WorkoutPlanType>();
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // Fetch workout plans
    api.workoutPlanGet().then((response) => {
      console.log('workoutPlans', response.data);
      setWorkoutPlans(response.data);
      setSelectedWorkoutPlan(response.data[0]);
    });
  }, []);

  const handleWizardComplete = (workoutPlan: WorkoutPlanType) => {
      setWorkoutPlans([workoutPlan]);
      setShowWizard(false);
  };

  const handleUpdateWorkoutPlan = (updatedPlan: WorkoutPlanType) => {
    setWorkoutPlans((prev) => prev.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan));
  };

  const handleChangeSelectedWorkoutPlan = (id: string) => {
    const plan = workoutPlans.find((p: WorkoutPlanType) => p.id = id) || undefined;
    setSelectedWorkoutPlan(plan);
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Personalized Workout Plan
      </Typography>
      <Card className="mb-4">
        <CardContent>
      {!showWizard && (
        <>
            <Typography variant="body1" paragraph>
              Create a personalized workout plan tailored to your fitness goals
              and DoD standards.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowWizard(true)}
            >
              Create Workout Plan
            </Button>
            </>
      )}
      {showWizard && (
        <WorkoutWizard
        onComplete={handleWizardComplete}
        onCancel={() => setShowWizard(false)}
        />
      )}
      </CardContent>
      </Card>
      
        <>
          <WorkoutDashboard workoutPlans={workoutPlans} changeSelectedWorkoutPlan={handleChangeSelectedWorkoutPlan}/>
          <WorkoutCalendar
            workoutPlan={selectedWorkoutPlan}
            onUpdateWorkoutPlan={handleUpdateWorkoutPlan}
          />
        </>
      
    </div>
  );
};

export default WorkoutPlan;
