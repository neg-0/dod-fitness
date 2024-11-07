import React, { useState, useEffect } from 'react';
import { Typography, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { Profile as ProfileType } from '../api/types';
import UserInformation from '../components/profile/UserInformation';
import FitnessComponent from '../components/profile/FitnessComponent';
import NutritionComponent from '../components/profile/NutritionComponent';
import MealPlanningComponent from '../components/profile/MealPlanningComponent';
import { MilitaryBranch } from '../theme/theme';

interface ProfileProps {
  onBranchChange: (branch: MilitaryBranch) => void;
}

const Profile: React.FC<ProfileProps> = ({ onBranchChange }) => {
  const { api } = useApi();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    console.log('Profile component mounted');
    if (api) {
      fetchProfile();
    } else {
      console.log('API not available, waiting...');
    }
  }, [api]);

  const fetchProfile = async () => {
    if (!api) {
      console.error('API is not available');
      setError('API is not available');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching profile data...');
      setLoading(true);
      const response = await api.profileGet();
      console.log('Profile data received:', response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedData: Partial<ProfileType>) => {
    if (!profileData || !api) return;

    try {
      const updatedProfile = { ...profileData, ...updatedData };
      await api.profilePut(updatedProfile);
      setProfileData(updatedProfile);
      if (updatedData.branch) {
        onBranchChange(updatedData.branch as MilitaryBranch);
      }
      setToast({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setToast({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '1rem' }}>Loading profile...</Typography>
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!profileData) {
    return <Typography>No profile data available. Please try again later.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UserInformation 
            profileData={profileData} 
            onUpdate={handleProfileUpdate}
            onBranchChange={onBranchChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FitnessComponent profileData={profileData} onUpdate={handleProfileUpdate} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NutritionComponent profileData={profileData} onUpdate={handleProfileUpdate} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MealPlanningComponent profileData={profileData} onUpdate={handleProfileUpdate} />
        </Grid>
        {/* <Grid item xs={12}>
          <GoalsProgressTracker profileData={profileData} />
        </Grid> */}
      </Grid>
      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ top: '80px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;