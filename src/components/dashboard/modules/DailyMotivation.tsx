import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Lightbulb } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const DailyMotivation: DashboardModule = () => {
  const motivationalQuote = "The only bad workout is the one that didn't happen.";

  return (
    <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Daily Motivation
        </Typography>
        <Typography variant="body1" align="center" style={{ fontStyle: 'italic' }}>
          "{motivationalQuote}"
        </Typography>
      </CardContent>
    </Card>
  );
};

DailyMotivation.moduleMetadata = {
  id: 'dailyMotivation',
  title: "Daily Motivation",
  description: "Get inspired with a daily motivational quote",
  icon: Lightbulb,
  defaultLayout: { w: 4, h: 1, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default DailyMotivation;