import React, { useState } from 'react';
import {
  Typography,
  Slider,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Profile } from '../../api/types';

interface MealPlanningComponentProps {
  profileData: Profile;
  onUpdate: (data: Partial<Profile>) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MealPlanningComponent: React.FC<MealPlanningComponentProps> = ({
  profileData,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    diningFacilityUsage: profileData.diningFacilityUsage || 25,
    onBaseRestaurantUsage: profileData.onBaseRestaurantUsage || 25,
    offBaseRestaurantUsage: profileData.offBaseRestaurantUsage || 25,
    homeCookingFrequency: profileData.homeCookingFrequency || 25,
  });

  const handleSliderChange = (name: string) => (event: any, newValue: number | number[]) => {
    const value = Math.round(newValue as number);
    
    setFormData(prevData => {
      // Get all fields except the one being changed
      const otherFields = Object.keys(prevData).filter(key => key !== name);
      
      // Calculate total of other fields
      const otherTotal = otherFields.reduce((sum, key) => 
        sum + prevData[key as keyof typeof prevData], 0
      );
      
      // Calculate how much we need to adjust other fields
      const difference = (value - prevData[name as keyof typeof prevData]);
      
      if (otherTotal === 0 && difference < 0) {
        // If other fields are 0, distribute the decreased value evenly
        const valuePerField = Math.floor(-difference / otherFields.length);
        const newData = { ...prevData, [name]: value };
        otherFields.forEach((key, index) => {
          newData[key as keyof typeof prevData] = valuePerField + 
            (index < (-difference % otherFields.length) ? 1 : 0);
        });
        return newData;
      }
      
      // Create new form data with proportional adjustments
      const newData = { ...prevData, [name]: value };
      
      if (otherTotal > 0) {
        otherFields.forEach(key => {
          const currentValue = prevData[key as keyof typeof prevData];
          const proportion = currentValue / otherTotal;
          newData[key as keyof typeof prevData] = Math.max(0, 
            Math.round(currentValue - (difference * proportion))
          );
        });
      }
      
      // Ensure total is exactly 100
      const newTotal = Object.values(newData).reduce((sum, val) => sum + val, 0);
      if (newTotal !== 100) {
        // Find the largest value to adjust
        const largestField = Object.keys(newData)
          .reduce((a, b) => newData[a as keyof typeof newData] > newData[b as keyof typeof newData] ? a : b);
        newData[largestField as keyof typeof newData] += (100 - newTotal);
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setEditMode(false);
  };

  const renderSlider = (name: string, label: string) => (
    <Grid item xs={12}>
      <Typography id={`${name}-slider`} gutterBottom>
        {label}: {Math.round(formData[name as keyof typeof formData])}%
      </Typography>
      <Slider
        value={formData[name as keyof typeof formData]}
        onChange={handleSliderChange(name)}
        aria-labelledby={`${name}-slider`}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={100}
      />
    </Grid>
  );

  const chartData = [
    { name: 'Dining Facility', value: formData.diningFacilityUsage },
    { name: 'On-Base Restaurant', value: formData.onBaseRestaurantUsage },
    { name: 'Off-Base Dining', value: formData.offBaseRestaurantUsage },
    { name: 'Home Cooking', value: formData.homeCookingFrequency },
  ].filter(item => item.value > 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Meal Planning Preferences
        </Typography>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {renderSlider('diningFacilityUsage', 'Dining Facility Usage')}
              {renderSlider('onBaseRestaurantUsage', 'On-Base Restaurant Usage')}
              {renderSlider('offBaseRestaurantUsage', 'Off-Base Dining')}
              {renderSlider('homeCookingFrequency', 'Home Cooking Frequency')}
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: '8px' }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <div>
            <Box sx={{ height: 300, mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Button
              onClick={() => setEditMode(true)}
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
            >
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealPlanningComponent;
