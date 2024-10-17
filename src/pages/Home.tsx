import React from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Activity, Utensils, UserCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to DoD Fitness
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Your personalized fitness and nutrition companion
      </Typography>
      <Grid container spacing={4} className="mt-8">
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Activity className="text-primary mb-4 mx-auto" size={48} />
              <Typography variant="h5" component="h3" gutterBottom>
                Workout Plans
              </Typography>
              <Typography variant="body1" paragraph>
                Get personalized workout plans tailored to DoD fitness standards.
              </Typography>
              <Button
                component={Link}
                to="/workout-plan"
                variant="contained"
                color="primary"
              >
                Start Workout Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Utensils className="text-primary mb-4 mx-auto" size={48} />
              <Typography variant="h5" component="h3" gutterBottom>
                Nutrition Plans
              </Typography>
              <Typography variant="body1" paragraph>
                Receive customized nutrition plans to support your fitness goals.
              </Typography>
              <Button
                component={Link}
                to="/nutrition-plan"
                variant="contained"
                color="primary"
              >
                Get Nutrition Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <UserCircle className="text-primary mb-4 mx-auto" size={48} />
              <Typography variant="h5" component="h3" gutterBottom>
                Your Profile
              </Typography>
              <Typography variant="body1" paragraph>
                Update your profile, waivers, and fitness limitations.
              </Typography>
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                color="primary"
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;