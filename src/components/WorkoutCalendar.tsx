import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, Modal, Box, Tooltip, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { WorkoutPlan, DailyWorkout } from '../api/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import WorkoutDayDetails from './WorkoutDayDetails';
import { getWorkoutTypeColor } from '../utils/workoutUtils';

interface WorkoutCalendarProps {
  workoutPlan: WorkoutPlan;
  onUpdateWorkoutPlan: (updatedPlan: WorkoutPlan) => void;
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ workoutPlan, onUpdateWorkoutPlan }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: 'month' | 'week' | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

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
        {daysInWeek.map((day) => renderDayCard(day, true))}
      </div>
    );
  };

  const renderDayCard = (day: Date, isWeekView: boolean = false) => {
    const workout = workoutPlan.weeklyPlan.find((w) => isSameDay(new Date(w.day), day));
    const isCurrentMonth = isSameMonth(day, currentDate);

    return (
      <Tooltip
        key={day.toISOString()}
        title={workout ? `${workout.summary} - ${workout.duration} minutes` : 'No workout'}
        arrow
      >
        <Card
          className={`p-2 cursor-pointer hover:bg-gray-100 transition-colors ${
            isCurrentMonth ? '' : 'opacity-50'
          } ${workout ? `border-2 border-${getWorkoutTypeColor(workout.workoutType)}-500` : ''}`}
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
    const updatedWeeklyPlan = workoutPlan.weeklyPlan.map((workout) =>
      isSameDay(new Date(workout.day), selectedDay!) ? updatedWorkout : workout
    );
    const updatedPlan = { ...workoutPlan, weeklyPlan: updatedWeeklyPlan };
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
          <Button onClick={handlePrevious}>Previous {view === 'month' ? 'Month' : 'Week'}</Button>
          <Typography variant="h6">{format(currentDate, view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy")}</Typography>
          <Button onClick={handleNext}>Next {view === 'month' ? 'Month' : 'Week'}</Button>
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
        {view === 'month' ? renderMonthView() : renderWeekView()}
      </CardContent>
      <Modal open={!!selectedDay} onClose={handleCloseModal} aria-labelledby="workout-day-details">
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          {selectedDay && (
            <WorkoutDayDetails
              date={selectedDay}
              workout={workoutPlan.weeklyPlan.find((w) => isSameDay(new Date(w.day), selectedDay))}
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