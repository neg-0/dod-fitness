import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, LinearProgress } from '@mui/material';
import { GlassWater } from 'lucide-react';

const HydrationTracker: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(8); // 8 glasses per day

  useEffect(() => {
    const savedIntake = localStorage.getItem('waterIntake');
    if (savedIntake) {
      setWaterIntake(parseInt(savedIntake, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  const handleDrink = () => {
    setWaterIntake(prev => Math.min(prev + 1, dailyGoal));
  };

  const resetIntake = () => {
    setWaterIntake(0);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Hydration Tracker
        </Typography>
        <Typography variant="body1">
          Daily Goal: {dailyGoal} glasses
        </Typography>
        <Typography variant="body2" gutterBottom>
          Current Intake: {waterIntake} glasses
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={(waterIntake / dailyGoal) * 100} 
          className="my-2"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<GlassWater />}
          onClick={handleDrink}
          fullWidth
          className="mb-2"
        >
          Log Water Intake
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetIntake}
          fullWidth
        >
          Reset Daily Intake
        </Button>
      </CardContent>
    </Card>
  );
};

export default HydrationTracker;