import React, { useState } from 'react';
import { Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, setIsAuthenticated } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleBypass = async () => {
    // Bypass login for development purposes
    const success = await login('testuser', 'password123');
    if (success) {
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom className="text-center">
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Log In
            </Button>
          </form>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            className="mt-2"
            onClick={handleBypass}
          >
            Bypass Login (Dev Only)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;