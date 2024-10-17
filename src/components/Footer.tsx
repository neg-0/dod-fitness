import React from 'react';
import { Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-4">
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} DoD Fitness App. All rights reserved.
          <br />
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>
          {' | '}
          <Link color="inherit" href="#">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;