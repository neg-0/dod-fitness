import React, { useState } from 'react';
import {
  Typography,
  Slider,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Profile } from '../../api/types';

interface MealPlanningComponentProps {
  profileData: Profile;
  onUpdate: (data: Partial<Profile>) => void;
}

const MealPlanningComponent: React.FC<MealPlanningComponentProps> = ({
  profileData,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    diningFacilityUsage: profileData.diningFacilityUsage || 0,
    onBaseRestaurantUsage: profileData.onBaseRestaurantUsage || 0,
    offBaseRestaurantUsage: profileData.offBaseRestaurantUsage || 0,
    homeCookingFrequency: profileData.homeCookingFrequency || 0,
  });

  const handleSliderChange =
    (name: string) => (event: any, newValue: number | number[]) => {
      setFormData({ ...formData, [name]: newValue as number });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setEditMode(false);
  };

  const renderSlider = (name: string, label: string) => (
    <Grid item xs={12}>
      <Typography id={`${name}-slider`} gutterBottom>
        {label}
      </Typography>
      <Slider
        value={formData[name as keyof typeof formData]}
        onChange={handleSliderChange(name)}
        aria-labelledby={`${name}-slider`}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
    </Grid>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Meal Planning Preferences
        </Typography>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {renderSlider('diningFacilityUsage', 'Dining Facility Usage (%)')}
              {renderSlider(
                'onBaseRestaurantUsage',
                'On-Base Restaurant Usage (%)'
              )}
              {renderSlider('offBaseRestaurantUsage', 'Off-Base Dining (%)')}
              {renderSlider(
                'homeCookingFrequency',
                'Home Cooking Frequency (%)'
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
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
            <Typography>
              Dining Facility Usage: {profileData.diningFacilityUsage || 0}%
            </Typography>
            <Typography>
              On-Base Restaurant Usage: {profileData.onBaseRestaurantUsage || 0}
              %
            </Typography>
            <Typography>
              Off-Base Dining: {profileData.offBaseRestaurantUsage || 0}%
            </Typography>
            <Typography>
              Home Cooking Frequency: {profileData.homeCookingFrequency || 0}%
            </Typography>
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
