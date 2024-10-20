import React from 'react';
import { Typography, Container, Link, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.primary.main, py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ color: theme.palette.primary.contrastText }}>
          © {new Date().getFullYear()} DoD Fitness App. All rights reserved.
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
      </Container>
    </Box>
  );
};

export default Footer;