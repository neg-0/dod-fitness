import React, { useState } from 'react';
import { Typography, Container, Link, Box, Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ApiFactory from '../services/apiConfig';

const Footer: React.FC = () => {
  const theme = useTheme();
  const [useLiveApi, setUseLiveApi] = useState(ApiFactory.getMode() === 'live');

  const handleApiToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.checked ? 'live' : 'mock';
    ApiFactory.setMode(newMode);
    setUseLiveApi(event.target.checked);
  };

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.background.default, py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ color: theme.palette.primary.contrastText }}>
          © {new Date().getFullYear()} Atlas. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: theme.palette.primary.contrastText }}>
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>
          {' | '}
          <Link color="inherit" href="#">
            Terms of Service
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={useLiveApi}
                onChange={handleApiToggle}
                name="apiToggle"
                color="secondary"
              />
            }
            label={
              <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
                {useLiveApi ? 'Live API' : 'Mock API'}
              </Typography>
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;