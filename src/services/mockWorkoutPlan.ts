import { WorkoutPlan, WorkoutPlanRequest, DailyWorkout } from '../api';
import { addDays, format, startOfWeek, endOfWeek } from 'date-fns';

const workoutTypes: ('cardio' | 'strength' | 'yoga' | 'hiit' | 'rest')[] = ['cardio', 'strength', 'yoga', 'hiit', 'rest'];

export const generateMockWorkoutPlan = (request: WorkoutPlanRequest): WorkoutPlan => {
  const startDate = new Date();
  const endDate = addDays(startDate, request.duration * 7);

  return {
    id: '1',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    weeklyPlan: generateMockWeeklyPlan(startDate, request.duration),
  };
};

const generateMockWeeklyPlan = (startDate: Date, weeks: number): DailyWorkout[] => {
  const weeklyPlan: DailyWorkout[] = [];

  for (let week = 0; week < weeks; week++) {
    const weekStart = startOfWeek(addDays(startDate, week * 7));
    const weekEnd = endOfWeek(weekStart);

    for (let day = 0; day < 7; day++) {
      const currentDate = addDays(weekStart, day);
      const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];

      weeklyPlan.push(generateDailyWorkout(currentDate, workoutType));
    }
  }

  return weeklyPlan;
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