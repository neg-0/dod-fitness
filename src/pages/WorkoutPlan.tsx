import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { WorkoutPlan as WorkoutPlanType } from '../api/types';
import WorkoutWizard from '../components/WorkoutWizard';
import WorkoutCalendar from '../components/WorkoutCalendar';
import WorkoutDashboard from '../components/WorkoutDashboard';

const WorkoutPlan: React.FC = () => {
  const { api } = useApi();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('workoutPlan');
    if (savedPlan) {
      setWorkoutPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handleWizardComplete = async (wizardData: any) => {
    if (!api) return;

    try {
      const response = await api.workoutPlanPost({
        goal: wizardData.goal,
        duration: wizardData.duration,
        branch: wizardData.branch,
      });
      setWorkoutPlan(response.data);
      localStorage.setItem('workoutPlan', JSON.stringify(response.data));
      setShowWizard(false);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    }
  };

  const handleUpdateWorkoutPlan = (updatedPlan: WorkoutPlanType) => {
    setWorkoutPlan(updatedPlan);
    localStorage.setItem('workoutPlan', JSON.stringify(updatedPlan));
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Personalized Workout Plan
      </Typography>
      {!workoutPlan && !showWizard && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="body1" paragraph>
              Create a personalized workout plan tailored to your fitness goals and DoD standards.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowWizard(true)}
            >
              Create Workout Plan
            </Button>
          </CardContent>
        </Card>
      )}
      {showWizard && (
        <WorkoutWizard onComplete={handleWizardComplete} onCancel={() => setShowWizard(false)} />
      )}
      {workoutPlan && (
        <>
          <WorkoutDashboard workoutPlan={workoutPlan} />
          <WorkoutCalendar workoutPlan={workoutPlan} onUpdateWorkoutPlan={handleUpdateWorkoutPlan} />
        </>
      )}
    </div>
  );
};

export default WorkoutPlan;