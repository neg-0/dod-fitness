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
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../contexts/AuthContext';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    branch: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await login(email, password, selectedRole as UserRole);
      if (success) {
        navigate('/', { replace: true });
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleRegistration = async () => {
    setError(null);
    if (
      !registrationData.email ||
      !registrationData.password ||
      !registrationData.name ||
      !registrationData.age ||
      !registrationData.branch
    ) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const success = await register({
        email: registrationData.email,
        password: registrationData.password,
        name: registrationData.name,
        age: parseInt(registrationData.age),
        branch: registrationData.branch,
      });

      if (success) {
        setSuccessMessage('Registration successful! Please check your email for verification.');
        setIsRegistering(false);
        // Reset registration form
        setRegistrationData({
          email: '',
          password: '',
          name: '',
          age: '',
          branch: '',
        });
      } else {
        setError('Registration failed. Email may already exist.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  const handleDevLogin = async (role: UserRole) => {
    const devCredentials: Record<
      UserRole,
      { email: string; password: string }
    > = {
      SystemAdministrator: { email: 'admin@atlas.mil', password: 'admin123' },
      UnitLeadership: { email: 'leader@atlas.mil', password: 'leader123' },
      FitnessSpecialist: { email: 'fitness@atlas.mil', password: 'fitness123' },
      NutritionSpecialist: { 
        email: 'nutrition@atlas.mil',
        password: 'nutrition123',
      },
      BaseMember: { email: 'member@atlas.mil', password: 'member123' },
    };

    const { email, password } = devCredentials[role];
    setError(null);
    
    try {
      const success = await login(email, password, role);
      if (success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError('Development login failed. Please check the mock user data.');
      }
    } catch (err) {
      setError('An error occurred during development login.');
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      {/* Left side with logo */}
      <div className="flex-1 flex justify-center items-center">
        <div style={{ 
          position: 'relative',
          width: '800px',
          height: '800px',
        }}>
          <img 
          src="/images/logos/AtlasLogo.png" 
          alt="Atlas Logo" 
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.9,
              maskImage: 'radial-gradient(circle at center, black 50%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 75%)',
            }}
          />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex justify-start items-center"
        style={{
          zIndex: 1000
        }}
      >
        <Card className="w-full max-w-md mr-16" style={{ backgroundColor: 'rgb(243 243 236)' }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              className="text-center"
            >
              Atlas Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Snackbar
              open={!!successMessage}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                {successMessage}
              </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ my: 1 }}
              >
                Log In
              </Button>
            </form>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ my: 1 }}
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
      </div>

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
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Register for Atlas
          </Typography>
          <TextField
            fullWidth
            label="Email"
            value={registrationData.email}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Military Branch</InputLabel>
            <Select
              value={registrationData.branch}
              label="Military Branch"
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  branch: e.target.value,
                })
              }
              required
            >
              <MenuItem value="Army">Army</MenuItem>
              <MenuItem value="Navy">Navy</MenuItem>
              <MenuItem value="Air Force">Air Force</MenuItem>
              <MenuItem value="Marines">Marines</MenuItem>
              <MenuItem value="Coast Guard">Coast Guard</MenuItem>
              <MenuItem value="Space Force">Space Force</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistration}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setIsRegistering(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
