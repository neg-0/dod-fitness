import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Modal,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    branch: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password, selectedRole as UserRole);
    if (success) {
      navigate('/', { replace: true });
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegistration = async () => {
    console.log('Registration data:', registrationData);
    setIsRegistering(false);
    alert('Registration successful! You can now log in.');
  };

  const handleDevLogin = async (role: UserRole) => {
    const devCredentials: Record<UserRole, { username: string; password: string }> = {
      SystemAdministrator: { username: 'admin', password: 'admin123' },
      UnitLeadership: { username: 'leader', password: 'leader123' },
      FitnessSpecialist: { username: 'fitness', password: 'fitness123' },
      NutritionSpecialist: { username: 'nutrition', password: 'nutrition123' },
      BaseMember: { username: 'member', password: 'member123' },
    };

    const { username, password } = devCredentials[role];
    const success = await login(username, password, role);
    if (success) {
      navigate('/', { replace: true });
    } else {
      alert('Development login failed. Please check the mock user data.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="text-center"
          >
            DoD Fitness App Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                required
              >
                <MenuItem value="BaseMember">Base Member</MenuItem>
                <MenuItem value="FitnessSpecialist">Fitness Specialist</MenuItem>
                <MenuItem value="NutritionSpecialist">Nutrition Specialist</MenuItem>
                <MenuItem value="UnitLeadership">Unit Leadership</MenuItem>
                <MenuItem value="SystemAdministrator">System Administrator</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                my: 1,
              }}
            >
              Log In
            </Button>
          </form>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              my: 1,
            }}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </Button>

          <Typography variant="h6" className="mt-4 mb-2 text-center">
            Development Login Options
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleDevLogin('SystemAdministrator')}
              >
                Admin
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleDevLogin('UnitLeadership')}
              >
                Unit Leader
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleDevLogin('FitnessSpecialist')}
              >
                Fitness Specialist
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleDevLogin('NutritionSpecialist')}
              >
                Nutrition Specialist
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => handleDevLogin('BaseMember')}
              >
                Base Member
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal
        open={isRegistering}
        onClose={() => setIsRegistering(false)}
        aria-labelledby="registration-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Register for DoD Fitness App
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={registrationData.username}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                username: e.target.value,
              })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Name"
            value={registrationData.name}
            onChange={(e) =>
              setRegistrationData({ ...registrationData, name: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={registrationData.age}
            onChange={(e) =>
              setRegistrationData({ ...registrationData, age: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Military Branch"
            value={registrationData.branch}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                branch: e.target.value,
              })
            }
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            onClick={handleRegistration}
          >
            Register
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;