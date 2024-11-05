import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Modal,
  Box,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { WorkoutPlan, DailyWorkout } from '../../api/types';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import WorkoutDayDetails from './WorkoutDayDetails';
import { getWorkoutTypeColor } from '../../utils/workoutUtils';

interface WorkoutCalendarProps {
  workoutPlan?: WorkoutPlan;
  onUpdateWorkoutPlan: (updatedPlan: WorkoutPlan) => void;
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({
  workoutPlan,
  onUpdateWorkoutPlan,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');

  console.log('workoutPlan', workoutPlan);

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'month' | 'week' | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => renderDayCard(day))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="grid grid-cols-7 gap-2">
        {daysInWeek.map((day) => {
          const workout = workoutPlan?.workouts?.find((w) =>
            isSameDay(new Date(w.day), day)
          );

          return (
            <Card key={day.toISOString()} className="p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300" onClick={() => setSelectedDay(day)}>
              <Typography variant="h6" className="text-center font-bold text-gray-800">
                {format(day, 'EEEE')}
              </Typography>
              {workout ? (
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={getWorkoutImage(workout.workoutType)}
                    alt={workout.workoutType}
                    className="w-full h-48 object-cover rounded-lg" style={{ opacity: '0.8' }}
                  />
                  <div className="p-4 bg-white rounded-b-lg">
                    <Typography variant="body1" className="text-center text-gray-700">
                      {workout.summary}
                    </Typography>
                  </div>
                </div>
              ) : (
                <Typography variant="body1" className="text-center text-gray-700 mt-4">
                  No workout
                </Typography>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  const getWorkoutImage = (workoutType: string) => {
    const images: Record<string, string> = {
      cardio: '/images/exercises/cardio.jpg',
      strength: '/images/exercises/strength.jpg',
      yoga: '/images/exercises/yoga.jpg',
      hiit: '/images/exercises/hiit.jpg',
      rest: '/images/exercises/rest.jpg',
    };
    return images[workoutType] || '/images/default.png';
  };

  const renderEmptyView = () => (
    <div className="text-center">
      <Typography variant="h6">No workouts scheduled</Typography>
    </div>
  );

  const renderDayCard = (day: Date, isWeekView: boolean = false) => {
    const workout = workoutPlan?.workouts?.find((w) =>
      isSameDay(new Date(w.day), day)
    );
    const isCurrentMonth = isSameMonth(day, currentDate);

    return (
      <Tooltip
        key={day.toISOString()}
        title={
          workout
            ? `${workout.summary} - ${workout.duration} minutes`
            : 'No workout'
        }
        arrow
      >
        <Card
          className={`p-2 cursor-pointer hover:bg-gray-100 transition-colors ${
            isCurrentMonth ? '' : 'opacity-50'
          } ${
            workout
              ? `border-2 border-${getWorkoutTypeColor(
                  workout.workoutType
                )}-500`
              : ''
          }`}
          onClick={() => setSelectedDay(day)}
        >
          <Typography variant="body2" className="text-center">
            {format(day, 'd')}
          </Typography>
          {workout && (
            <div className="mt-1">
              <Typography variant="caption" className="text-center block">
                {workout.summary}
              </Typography>
              {isWeekView && (
                <>
                  <Typography variant="caption" className="text-center block">
                    Duration: {workout.duration} min
                  </Typography>
                  <Typography variant="caption" className="text-center block">
                    Calories: {workout.caloriesBurned}
                  </Typography>
                </>
              )}
            </div>
          )}
        </Card>
      </Tooltip>
    );
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const handleUpdateWorkout = (updatedWorkout: DailyWorkout) => {
    const updatedworkouts = workoutPlan.workouts.map((workout) =>
      isSameDay(new Date(workout.day), selectedDay!) ? updatedWorkout : workout
    );
    const updatedPlan = { ...workoutPlan, workouts: updatedworkouts };
    onUpdateWorkoutPlan(updatedPlan);
  };

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate((date) => subMonths(date, 1));
    } else {
      setCurrentDate((date) => subWeeks(date, 1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate((date) => addMonths(date, 1));
    } else {
      setCurrentDate((date) => addWeeks(date, 1));
    }
  };

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handlePrevious}>
            Previous {view === 'month' ? 'Month' : 'Week'}
          </Button>
          <Typography variant="h6">
            {format(
              currentDate,
              view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy"
            )}
          </Typography>
          <Button onClick={handleNext}>
            Next {view === 'month' ? 'Month' : 'Week'}
          </Button>
        </div>
        <div className="mb-4">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="calendar view"
          >
            <ToggleButton value="month" aria-label="month view">
              Month
            </ToggleButton>
            <ToggleButton value="week" aria-label="week view">
              Week
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {workoutPlan ? (
          view === 'month' ? renderMonthView() : renderWeekView()
        ) : (
          renderEmptyView()
        )}
      </CardContent>
      <Modal
        open={!!selectedDay}
        onClose={handleCloseModal}
        aria-labelledby="workout-day-details"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          {selectedDay && workoutPlan && (
            <WorkoutDayDetails
              date={selectedDay}
              workout={workoutPlan.workouts.find((w) =>
                isSameDay(new Date(w.day), selectedDay)
              )}
              onClose={handleCloseModal}
              onUpdateWorkout={handleUpdateWorkout}
            />
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default WorkoutCalendar;
