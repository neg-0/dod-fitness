import { WorkoutPlan, WorkoutPlanRequest, DailyWorkout } from '../api';
import { addDays, differenceInDays, format } from 'date-fns';

const workoutTypes: ('cardio' | 'strength' | 'yoga' | 'hiit' | 'rest')[] = ['cardio', 'strength', 'yoga', 'hiit', 'rest'];

export const generateMockWorkoutPlan = (request: WorkoutPlanRequest): WorkoutPlan => {
  return {
    id: '1',
    startDate: request.startDate.toISOString(),
    endDate: request.endDate.toISOString(),
    workouts: generateMockWorkouts(request.startDate, request.endDate),
  };
};

const generateMockWorkouts = (startDate: Date, endDate: Date): DailyWorkout[] => {
  const workouts: DailyWorkout[] = [];

  const numOfDays = differenceInDays(startDate, endDate);

  for (let day = 0; day < numOfDays; day++) {
    const currentDate = addDays(startDate, day);
    const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    workouts.push(generateDailyWorkout(currentDate, workoutType));
  }

  return workouts;
};

const generateDailyWorkout = (date: Date, workoutType: 'cardio' | 'strength' | 'yoga' | 'hiit' | 'rest'): DailyWorkout => {
  const duration = workoutType === 'rest' ? 0 : Math.floor(Math.random() * 60) + 30;
  const caloriesBurned = workoutType === 'rest' ? 0 : Math.floor(Math.random() * 300) + 100;

  return {
    day: format(date, 'yyyy-MM-dd'),
    summary: getWorkoutSummary(workoutType),
    duration,
    caloriesBurned,
    workoutType,
    exercises: generateExercises(workoutType),
  };
};

const getWorkoutSummary = (workoutType: string): string => {
  switch (workoutType) {
    case 'cardio':
      return 'Cardio Blast';
    case 'strength':
      return 'Strength Training';
    case 'yoga':
      return 'Yoga Flow';
    case 'hiit':
      return 'High-Intensity Interval Training';
    case 'rest':
      return 'Rest Day';
    default:
      return 'General Workout';
  }
};

const generateExercises = (workoutType: string): DailyWorkout['exercises'] => {
  const exercises: DailyWorkout['exercises'] = [];
  const exerciseCount = workoutType === 'rest' ? 0 : Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < exerciseCount; i++) {
    exercises.push({
      name: getExerciseName(workoutType),
      sets: workoutType === 'strength' ? Math.floor(Math.random() * 3) + 2 : undefined,
      reps: workoutType === 'strength' ? Math.floor(Math.random() * 10) + 5 : undefined,
      duration: workoutType !== 'strength' ? Math.floor(Math.random() * 15) + 5 : undefined,
    });
  }

  return exercises;
};

const getExerciseName = (workoutType: string): string => {
  const exercises = {
    cardio: ['Running', 'Cycling', 'Jump Rope', 'Swimming', 'Rowing'],
    strength: ['Push-ups', 'Squats', 'Deadlifts', 'Bench Press', 'Lunges'],
    yoga: ['Sun Salutation', 'Warrior Pose', 'Downward Dog', 'Tree Pose', 'Child\'s Pose'],
    hiit: ['Burpees', 'Mountain Climbers', 'High Knees', 'Box Jumps', 'Plank Jacks'],
    rest: ['Stretching', 'Light Walking', 'Meditation'],
  };

  const exerciseList = exercises[workoutType as keyof typeof exercises] || exercises.cardio;
  return exerciseList[Math.floor(Math.random() * exerciseList.length)];
};