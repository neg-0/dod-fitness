import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { MessageCircle } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const SpecialistAdvice: DashboardModule = () => {
  const advice = {
    specialist: 'Capt. Sarah Johnson',
    role: 'Fitness Specialist',
    message: 'Focus on proper form during your strength training sessions to maximize results and prevent injuries. If you need help, don\'t hesitate to schedule a consultation.',
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Specialist Advice
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }}>{advice.specialist.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1">{advice.specialist}</Typography>
            <Typography variant="body2" color="textSecondary">{advice.role}</Typography>
          </Box>
        </Box>
        <Typography variant="body1">
          "{advice.message}"
        </Typography>
      </CardContent>
    </Card>
  );
};

SpecialistAdvice.moduleMetadata = {
  id: 'specialistAdvice',
  title: "Specialist Advice",
  description: "Get personalized advice from fitness and nutrition specialists",
  icon: MessageCircle,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership'] as UserRole[],
};

export default SpecialistAdvice;