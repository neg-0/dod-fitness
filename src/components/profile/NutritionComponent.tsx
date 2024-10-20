import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { Profile } from '../../api/types';

interface NutritionComponentProps {
  profileData: Profile;
  onUpdate: (data: Partial<Profile>) => void;
}

const NutritionComponent: React.FC<NutritionComponentProps> = ({
  profileData,
  onUpdate,
}) => {
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
          Nutrition Information
        </Typography>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dietary Restrictions"
                  name="dietaryRestrictions"
                  multiline
                  rows={3}
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nutrition Goals"
                  name="nutritionGoals"
                  multiline
                  rows={3}
                  value={formData.nutritionGoals || ''}
                  onChange={handleInputChange}
                />
              </Grid>
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
            <Typography>Dietary Restrictions:</Typography>
            {profileData.dietaryRestrictions ? (
              profileData.dietaryRestrictions
                .split(',')
                .map((restriction, index) => (
                  <Chip
                    key={index}
                    label={restriction.trim()}
                    className="m-1"
                  />
                ))
            ) : (
              <Typography>None</Typography>
            )}
            <Typography>
              Nutrition Goals: {profileData.nutritionGoals || 'Not specified'}
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

export default NutritionComponent;
