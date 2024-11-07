import React, { useState } from 'react';
import { Typography, TextField, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import { Profile } from '../../api/types';

interface FitnessComponentProps {
  profileData: Profile;
  onUpdate: (data: Partial<Profile>) => void;
}

const FitnessComponent: React.FC<FitnessComponentProps> = ({ profileData, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setEditMode(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fitness Information
        </Typography>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Waivers/Limitations"
                  name="fitnessWaivers"
                  multiline
                  rows={3}
                  value={formData.fitnessWaivers || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Goals"
                  name="fitnessGoals"
                  multiline
                  rows={3}
                  value={formData.fitnessGoals || ''}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Preferences"
                  name="fitnessPreferences"
                  multiline
                  rows={3}
                  value={formData.fitnessPreferences || ''}
                  onChange={handleInputChange}
                  helperText="e.g., cardio, strength training, team sports"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                <Button onClick={() => setEditMode(false)} variant="outlined" color="secondary" style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <div>
            <Typography variant="body1">Fitness Waivers/Limitations: {profileData.fitnessWaivers || 'None'}</Typography>
            <Typography variant="body1">Fitness Goals: {profileData.fitnessGoals || 'Not specified'}</Typography>
            <Typography variant="body1">Fitness Preferences:</Typography>
            <div>
              {profileData.fitnessPreferences ? (
                profileData.fitnessPreferences.split(',').map((pref, index) => (
                  <Chip key={index} label={pref.trim()} className="m-1" />
                ))
              ) : (
                <Typography variant="body2">Not specified</Typography>
              )}
            </div>
            <Button onClick={() => setEditMode(true)} variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FitnessComponent;