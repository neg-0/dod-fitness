import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const TeamPerformance: DashboardModule = () => {
  const data = [
    { name: 'Alpha Squad', score: 85 },
    { name: 'Bravo Team', score: 92 },
    { name: 'Charlie Platoon', score: 78 },
    { name: 'Delta Unit', score: 88 },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Team Performance
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

TeamPerformance.moduleMetadata = {
  id: 'teamPerformance',
  title: "Team Performance",
  description: "Compare performance across different teams",
  icon: TrendingUp,
  defaultLayout: { w: 3, h: 2, minW: 2, minH: 2 },
  roles: ['UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default TeamPerformance;