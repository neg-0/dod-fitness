import React, { useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Heart } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';
import WellnessCheckInModal from '../../wellness/WellnessCheckInModal';
import { formatDistanceToNow } from 'date-fns';

interface CheckInData {
  timestamp: string;
  physical: number | null;
  soreness: number | null;
  mental: number | null;
}

const WellnessCheckIn: DashboardModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<CheckInData | null>(() => {
    const saved = localStorage.getItem('lastWellnessCheckIn');
    return saved ? JSON.parse(saved) : null;
  });

  const handleCheckIn = useCallback((data: Omit<CheckInData, 'timestamp'>) => {
    const checkInData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    setLastCheckIn(checkInData);
    localStorage.setItem('lastWellnessCheckIn', JSON.stringify(checkInData));
    setIsModalOpen(false);
  }, []);

  const getStatusColor = (value: number | null) => {
    if (value === null) return 'text.secondary';
    if (value >= 4) return 'success.main';
    if (value >= 3) return 'warning.main';
    return 'error.main';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Daily Wellness Check-in
        </Typography>
        
        {lastCheckIn ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Last check-in: {formatDistanceToNow(new Date(lastCheckIn.timestamp))} ago
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color={getStatusColor(lastCheckIn.physical)}>
                Physical Health: {lastCheckIn.physical ? '⭐'.repeat(lastCheckIn.physical) : 'Not rated'}
              </Typography>
              <Typography variant="body2" color={getStatusColor(lastCheckIn.soreness)}>
                Soreness Level: {lastCheckIn.soreness ? '⭐'.repeat(lastCheckIn.soreness) : 'Not rated'}
              </Typography>
              <Typography variant="body2" color={getStatusColor(lastCheckIn.mental)}>
                Mental Wellbeing: {lastCheckIn.mental ? '⭐'.repeat(lastCheckIn.mental) : 'Not rated'}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No check-in recorded today
            </Typography>
          </Box>
        )}
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
          sx={{ mt: 2 }}
        >
          {lastCheckIn ? 'Update Check-in' : 'Check In Now'}
        </Button>
      </CardContent>

      <WellnessCheckInModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCheckIn}
        initialData={lastCheckIn}
      />
    </Card>
  );
};

WellnessCheckIn.moduleMetadata = {
  id: 'wellnessCheckIn',
  title: "Wellness Check-in",
  description: "Track your daily physical and mental wellbeing",
  icon: Heart,
  defaultLayout: { w: 1, h: 2, minW: 1, minH: 2 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default WellnessCheckIn;