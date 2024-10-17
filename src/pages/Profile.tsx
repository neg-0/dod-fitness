import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { Profile as ProfileType } from '../api/types';

const Profile: React.FC = () => {
  const { api } = useApi();
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
                <Button type="submit" variant="contained" color="primary">
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;