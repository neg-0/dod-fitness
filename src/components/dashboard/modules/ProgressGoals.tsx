import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, CircularProgress } from '@mui/material';
import { Target } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const ProgressGoals: DashboardModule<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const goals = [
    { name: 'Run 5K', progress: 75 },
    { name: 'Bench Press 200lbs', progress: 60 },
    { name: 'Lose 10lbs', progress: 40 },
    { name: 'Complete 30 Day Challenge', progress: 90 },
  ];

  const renderSmall = () => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <CircularProgress variant="determinate" value={goals[0].progress} size={60} />
      <Typography variant="body2" mt={1}>{goals[0].name}</Typography>
    </Box>
  );

  const renderMedium = () => (
    <>
      <Typography variant="h6" gutterBottom>Progress Goals</Typography>
      {goals.slice(0, 2).map((goal, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body2">{goal.name}</Typography>
          <LinearProgress variant="determinate" value={goal.progress} />
          <Typography variant="body2" align="right">{goal.progress}%</Typography>
        </Box>
      ))}
    </>
  );

  const renderLarge = () => (
    <>
      <Typography variant="h6" gutterBottom>Progress Goals</Typography>
      {goals.map((goal, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body2">{goal.name}</Typography>
          <LinearProgress variant="determinate" value={goal.progress} />
          <Typography variant="body2" align="right">{goal.progress}%</Typography>
        </Box>
      ))}
    </>
  );

  return (
    <Card sx={{ height: '100%', overflow: 'auto' }}>
      <CardContent>
        {size === 'small' && renderSmall()}
        {size === 'medium' && renderMedium()}
        {size === 'large' && renderLarge()}
      </CardContent>
    </Card>
  );
};

ProgressGoals.moduleMetadata = {
  id: 'progressGoals',
  title: "Progress Goals",
  description: "Track your progress towards fitness goals",
  icon: Target,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist'] as UserRole[],
};

export default ProgressGoals;