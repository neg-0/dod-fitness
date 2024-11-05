import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import { DailyWorkout, Exercise } from '../../api/types';
import { getWorkoutTypeColor } from '../../utils/workoutUtils';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SparkleParticles from '../common/SparkleParticles';

interface WorkoutDayDetailsProps {
  date: Date;
  workout: DailyWorkout | undefined;
  onClose: () => void;
  onUpdateWorkout: (updatedWorkout: DailyWorkout) => void;
}

const WorkoutDayDetails: React.FC<WorkoutDayDetailsProps> = ({
  date,
  workout,
  onClose,
  onUpdateWorkout,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>(
    workout?.exercises || []
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const isCompleted = exercises.every((ex) => ex.completed);

  useEffect(() => {
    if (exercises.every((ex) => ex.completed)) {
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

  const handleDifficultyChange = (
    index: number,
    difficulty: 'easy' | 'just-right' | 'hard'
  ) => {
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
    <AnimatePresence>
      <motion.div className="relative rounded-lg">
        {/* <SparkleParticles 
          active={isCompleted}
          minSize={1.5}
          maxSize={4}
          colors={[
            'rgba(79, 70, 229, 1)', // Indigo
            'rgba(147, 51, 234, 1)', // Purple
            'rgba(59, 130, 246, 1)', // Blue
          ]}
          particleDensity={0.5}
          spawnRate={0.4}
          minSpeed={1}
          maxSpeed={2}
          lifeDuration={1.2}
          fadeSpeed={0.008}
          borderOffset={2}
          spreadRadius={4}
        /> */}
        <Card className={`bg-white shadow-lg ${
          isCompleted ? 'animate-glow-border' : ''
        }`}>
          <CardContent className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <Typography variant="h5" className="font-bold mb-2">
                  {format(date, 'MMMM d, yyyy')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={`font-medium text-${getWorkoutTypeColor(
                    workout?.workoutType
                  )}-500`}
                >
                  {workout?.summary}
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="h6" className="font-bold">
                  {workout?.duration} min
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {workout?.caloriesBurned} calories
                </Typography>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exercise.completed || false}
                          onChange={() => handleExerciseComplete(index)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          className={`${
                            exercise.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {exercise.name}
                        </Typography>
                      }
                    />
                    <Typography variant="body2" className="font-medium">
                      {exercise.sets
                        ? `${exercise.sets}×${exercise.reps}`
                        : `${exercise.duration} min`}
                    </Typography>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <Typography variant="body2" className="text-gray-600">
                      Difficulty:
                    </Typography>
                    <div className="flex gap-1">
                      {['easy', 'just-right', 'hard'].map((diff) => (
                        <IconButton
                          key={diff}
                          size="small"
                          onClick={() =>
                            handleDifficultyChange(index, diff as any)
                          }
                          className={`${
                            exercise.difficulty === diff
                              ? 'bg-blue-100 text-blue-600'
                              : ''
                          }`}
                        >
                          {diff === 'easy' && <ThumbsDown size={18} />}
                          {diff === 'just-right' && <Minus size={18} />}
                          {diff === 'hard' && <ThumbsUp size={18} />}
                        </IconButton>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Completion Message */}
            <AnimatePresence>
              {exercises.every((ex) => ex.completed) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-green-50 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="text-green-500" size={24} />
                  <Typography className="text-green-700 font-medium">
                    Congratulations! Workout completed! 🎉
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={onClose}
                className="px-6"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkoutDayDetails;
