import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { Profile as ProfileType } from '../api/types';

const Profile: React.FC = () => {
  const { api, createWorkoutPlan, createNutritionPlan } = useApi();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!api) return;

    try {
      setLoading(true);
      const response = await api.profileGet();
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData || !api) return;

    try {
      await api.profilePut(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // const handleGenerateWorkoutPlan = async () => {
  //   if (!profileData) return;
    
  //   try {
  //     const workoutPlan = await createWorkoutPlan(profileData);
  //     console.log('Generated workout plan:', workoutPlan);
  //   } catch (error) {
  //     console.error('Error generating workout plan:', error);
  //   }
  // };

  // const handleGenerateNutritionPlan = async () => {
  //   if (!profileData) return;
    
  //   try {
  //     const nutritionPlan = await createNutritionPlan(profileData);
  //     console.log('Generated nutrition plan:', nutritionPlan);
  //   } catch (error) {
  //     console.error('Error generating nutrition plan:', error);
  //   }
  // };

  const handlePlans = async () => {
    if (!profileData) return;
    
    try {
      const nutritionPlan = await createNutritionPlan(profileData);
      console.log('Generated nutrition plan:', nutritionPlan);
    } catch (error) {
      console.error('Error generating nutrition plan:', error);
    }

    try {
      const workoutPlan = await createWorkoutPlan(profileData);
      console.log('Generated workout plan:', workoutPlan);
      
    } catch (error) {
      console.error('Error generating workout plan:', error);
    }
  };

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  if (!profileData) {
    return <Typography>Error loading profile. Please try again later.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Profile
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Existing Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={profileData.age}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (inches)"
                  name="height"
                  type="number"
                  value={profileData.height}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (lbs)"
                  name="weight"
                  type="number"
                  value={profileData.weight}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Military Branch"
                  name="branch"
                  value={profileData.branch}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Waivers or Limitations"
                  name="fitnessWaivers"
                  multiline
                  rows={3}
                  value={profileData.fitnessWaivers}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dietary Restrictions"
                  name="dietaryRestrictions"
                  multiline
                  rows={3}
                  value={profileData.dietaryRestrictions}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Goals"
                  name="goals"
                  multiline
                  rows={3}
                  value={profileData.goals}
                  onChange={handleInputChange}
                />
              </Grid>
              {/* New Fields from Wearable Device */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Resting Heart Rate"
                  name="restingHeartRate"
                  type="number"
                  value={profileData.restingHeartRate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Heart Rate Variability"
                  name="heartRateVariability"
                  type="number"
                  value={profileData.heartRateVariability}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="VO2 Max"
                  name="vo2Max"
                  type="number"
                  value={profileData.vo2Max}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stress Level"
                  name="stress"
                  type="number"
                  value={profileData.stress}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Body Battery"
                  name="bodyBattery"
                  type="number"
                  value={profileData.bodyBattery}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Intensity"
                  name="intensity"
                  type="number"
                  value={profileData.intensity}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary"                         onClick={handlePlans}
                >
                  Update Profile
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleGenerateWorkoutPlan}
                >
                  Generate Workout Plan
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={handleGenerateNutritionPlan}
                >
                  Generate Nutrition Plan
                </Button>
              </Grid> */}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
