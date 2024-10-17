export const getWorkoutTypeColor = (workoutType: string): string => {
  switch (workoutType) {
    case 'cardio':
      return 'blue';
    case 'strength':
      return 'red';
    case 'yoga':
      return 'green';
    case 'hiit':
      return 'orange';
    case 'rest':
      return 'gray';
    default:
      return 'purple';
  }
};