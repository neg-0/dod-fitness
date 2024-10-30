import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import { PlayCircle, Dumbbell } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const TodaysWorkout: DashboardModule = () => {
  const workout = {
    name: 'Full Body Strength',
    exercises: [
      { name: 'Squats', sets: 3, reps: 10 },
      { name: 'Bench Press', sets: 3, reps: 8 },
      { name: 'Rows', sets: 3, reps: 10 },
    ],
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Today's Workout: {workout.name}
        </Typography>
        <List dense>
          {workout.exercises.map((exercise, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={exercise.name}
                secondary={`${exercise.sets} sets x ${exercise.reps} reps`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayCircle />}
          fullWidth
        >
          Start Workout
        </Button>
      </Box>
    </Card>
  );
};

TodaysWorkout.moduleMetadata = {
  id: 'todaysWorkout',
  title: "Today's Workout",
  description: 'View and start your workout for today',
  icon: Dumbbell,
  defaultLayout: { w: 2, h: 4, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist'] as UserRole[],
};

export default TodaysWorkout;
