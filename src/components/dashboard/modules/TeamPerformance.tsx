import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const TeamPerformance: DashboardModule = () => {
  const data = [
    { 
      name: 'Alpha Crew', 
      fitness: 85,
      nutrition: 78,
      readiness: 90
    },
    { 
      name: 'Bravo Crew', 
      fitness: 92,
      nutrition: 85,
      readiness: 88
    },
    { 
      name: 'Charlie Crew', 
      fitness: 78,
      nutrition: 82,
      readiness: 85
    },
    { 
      name: 'Delta Crew', 
      fitness: 88,
      nutrition: 80,
      readiness: 92
    },
    { 
      name: 'Echo Crew', 
      fitness: 84,
      nutrition: 88,
      readiness: 86
    },
    { 
      name: 'Foxtrot Crew', 
      fitness: 89,
      nutrition: 86,
      readiness: 91
    }
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Team Performance Metrics
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, '']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '4px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="fitness" 
              name="Fitness Score" 
              fill="#1C3E6E" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="nutrition" 
              name="Nutrition Score" 
              fill="#82ca9d" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="readiness" 
              name="Readiness Score" 
              fill="#FFCC00" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

TeamPerformance.moduleMetadata = {
  id: 'teamPerformance',
  title: "Team Performance",
  description: "Compare performance metrics across different crews",
  icon: TrendingUp,
  defaultLayout: { w: 4, h: 3, minW: 2, minH: 2 },
  roles: ['UnitLeadership', 'FitnessSpecialist', 'NutritionSpecialist'] as UserRole[],
};

export default TeamPerformance;