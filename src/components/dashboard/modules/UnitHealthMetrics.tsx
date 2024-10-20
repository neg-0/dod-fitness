import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const UnitHealthMetrics: DashboardModule = () => {
  const data = [
    { name: 'Fitness Score', value: 85 },
    { name: 'Nutrition Score', value: 78 },
    { name: 'Mental Health', value: 92 },
    { name: 'Readiness', value: 88 },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Unit Health Metrics
        </Typography>
        <Grid container spacing={2} sx={{ height: 'calc(100% - 32px)' }}>
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            {data.map((item) => (
              <Typography key={item.name} variant="body1">
                {item.name}: {item.value}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

UnitHealthMetrics.moduleMetadata = {
  id: 'unitHealthMetrics',
  title: "Unit Health Metrics",
  description: "View overall health metrics for your unit",
  icon: BarChart2,
  defaultLayout: { w: 3, h: 2, minW: 2, minH: 2 },
  roles: ['UnitLeadership'] as UserRole[],
};

export default UnitHealthMetrics;