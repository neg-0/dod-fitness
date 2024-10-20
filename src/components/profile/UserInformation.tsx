import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Profile } from '../../api/types';
import { MilitaryBranch } from '../../theme/theme';

interface UserInformationProps {
  profileData: Profile;
  onUpdate: (data: Partial<Profile>) => void;
  onBranchChange: (branch: MilitaryBranch) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  profileData,
  onUpdate,
  onBranchChange,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
    if (name === 'branch') {
      onBranchChange(value as MilitaryBranch);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setEditMode(false);
  };

  const branches: MilitaryBranch[] = [
    'Army',
    'Navy',
    'Air Force',
    'Marine Corps',
    'Coast Guard',
    'Space Force',
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
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
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="branch-select-label">
                    Military Branch
                  </InputLabel>
                  <Select
                    labelId="branch-select-label"
                    id="branch-select"
                    name="branch"
                    value={formData.branch}
                    label="Military Branch"
                    onChange={handleInputChange}
                    required
                  >
                    {branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Installation"
                  name="currentInstallation"
                  value={formData.currentInstallation || ''}
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
            <Typography variant="body1">Name: {profileData.name}</Typography>
            <Typography variant="body1">Age: {profileData.age}</Typography>
            <Typography variant="body1">
              Military Branch: {profileData.branch}
            </Typography>
            <Typography variant="body1">
              Current Installation:{' '}
              {profileData.currentInstallation || 'Not specified'}
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

export default UserInformation;
