import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Checkbox, FormControlLabel, Button, Box, IconButton } from '@mui/material';
import { format } from 'date-fns';
import Confetti from 'react-confetti';
import { DailyWorkout, Exercise } from '../api/types';
import { getWorkoutTypeColor } from '../utils/workoutUtils';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface WorkoutDayDetailsProps {
  date: Date;
  workout: DailyWorkout | undefined;
  onClose: () => void;
  onUpdateWorkout: (updatedWorkout: DailyWorkout) => void;
}

const WorkoutDayDetails: React.FC<WorkoutDayDetailsProps> = ({ date, workout, onClose, onUpdateWorkout }) => {
  const [exercises, setExercises] = useState<Exercise[]>(workout?.exercises || []);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (exercises.every(ex => ex.completed)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [exercises]);

  const handleExerciseComplete = (index: number) => {
    const updatedExercises = exercises.map((ex, i) => 
      i === index ? { ...ex, completed: !ex.completed } : ex
    );
    setExercises(updatedExercises);
    updateWorkout(updatedExercises);
  };

  const handleDifficultyChange = (index: number, difficulty: 'easy' | 'just-right' | 'hard') => {
    const updatedExercises = exercises.map((ex, i) => 
      i === index ? { ...ex, difficulty } : ex
    );
    setExercises(updatedExercises);
    updateWorkout(updatedExercises);
  };

  const updateWorkout = (updatedExercises: Exercise[]) => {
    if (workout) {
      const updatedWorkout: DailyWorkout = {
        ...workout,
        exercises: updatedExercises,
      };
      onUpdateWorkout(updatedWorkout);
    }
  };

  if (!workout) {
    return (
      <Card className="bg-white">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            No workout scheduled for {format(date, 'MMMM d, yyyy')}
          </Typography>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Workout for {format(date, 'MMMM d, yyyy')}
        </Typography>
        <Typography variant="subtitle1" gutterBottom className={`text-${getWorkoutTypeColor(workout.workoutType)}-500`}>
          {workout.summary}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Duration: {workout.duration} minutes
        </Typography>
        <Typography variant="body2" gutterBottom>
          Calories Burned: {workout.caloriesBurned}
        </Typography>
        {exercises.map((exercise, index) => (
          <Box key={index} className="mb-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={exercise.completed || false}
                  onChange={() => handleExerciseComplete(index)}
                />
              }
              label={`${exercise.name}: ${exercise.sets ? `${exercise.sets}x${exercise.reps}` : `${exercise.duration} min`}`}
            />
            <Typography variant="body2" gutterBottom>
              Difficulty:
            </Typography>
            <Box>
              <IconButton
                onClick={() => handleDifficultyChange(index, 'easy')}
                color={exercise.difficulty === 'easy' ? 'primary' : 'default'}
              >
                <ThumbsDown />
              </IconButton>
              <IconButton
                onClick={() => handleDifficultyChange(index, 'just-right')}
                color={exercise.difficulty === 'just-right' ? 'primary' : 'default'}
              >
                <Minus />
              </IconButton>
              <IconButton
                onClick={() => handleDifficultyChange(index, 'hard')}
                color={exercise.difficulty === 'hard' ? 'primary' : 'default'}
              >
                <ThumbsUp />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
        {exercises.every(ex => ex.completed) && (
          <Typography variant="body1" className="mt-4 text-green-600">
            Great job! You've completed all exercises for today!
          </Typography>
        )}
      </CardContent>
      {showConfetti && <Confetti />}
    </Card>
  );
};

export default WorkoutDayDetails;