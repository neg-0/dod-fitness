import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  AlertTriangle,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Calendar,
  FileText,
  Plus,
} from 'lucide-react';

// Mock data (replace with actual data fetching logic)
const fitnessMetrics = [
  { name: 'Avg. Fitness Score', value: 82, trend: 'up' },
  { name: 'Workout Completion', value: 78, trend: 'down' },
  { name: 'Injury Rate', value: 5, trend: 'down' },
  { name: 'PT Test Pass Rate', value: 92, trend: 'up' },
];

const fitnessProgressData = [
  { month: 'Jan', avgScore: 78, completion: 72, passRate: 88 },
  { month: 'Feb', avgScore: 80, completion: 75, passRate: 90 },
  { month: 'Mar', avgScore: 82, completion: 78, passRate: 91 },
  { month: 'Apr', avgScore: 82, completion: 77, passRate: 92 },
];

const upcomingAssessments = [
  { id: 1, name: 'Alpha Squad PT Test', date: '2023-05-15', participants: 25 },
  { id: 2, name: 'Bravo Team Fitness Evaluation', date: '2023-05-18', participants: 30 },
  { id: 3, name: 'New Recruits Initial Assessment', date: '2023-05-20', participants: 15 },
];

const memberProgress = [
  { name: 'John Doe', improvement: 15 },
  { name: 'Jane Smith', improvement: 22 },
  { name: 'Mike Johnson', improvement: 10 },
  { name: 'Sarah Williams', improvement: 18 },
];

const FitnessSpecialistDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp color="green" size={16} />
    ) : (
      <TrendingDown color="red" size={16} />
    );
  };

  const renderMetricCard = (metric: { name: string; value: number; trend: string }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {metric.name}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">{metric.value}</Typography>
          {renderTrendIcon(metric.trend)}
        </Box>
      </CardContent>
    </Card>
  );

  const renderAssessmentsList = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Assessments
        </Typography>
        <List>
          {upcomingAssessments.map((assessment) => (
            <ListItem key={assessment.id} disablePadding>
              <ListItemText
                primary={assessment.name}
                secondary={`Date: ${assessment.date} | Participants: ${assessment.participants}`}
              />
            </ListItem>
          ))}
        </List>
        <Button startIcon={<Plus />} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Schedule New Assessment
        </Button>
      </CardContent>
    </Card>
  );

  const renderProgressChart = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fitness Progress Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fitnessProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgScore" name="Avg. Fitness Score" stroke="#8884d8" />
            <Line type="monotone" dataKey="completion" name="Workout Completion" stroke="#82ca9d" />
            <Line type="monotone" dataKey="passRate" name="PT Test Pass Rate" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderMemberProgress = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Member Improvements
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={memberProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="improvement" name="Fitness Score Improvement" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderQuickLinks = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button startIcon={<Users />} variant="outlined" fullWidth>
              Member Profiles
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<Activity />} variant="outlined" fullWidth>
              Workout Library
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<Calendar />} variant="outlined" fullWidth>
              Schedule
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<FileText />} variant="outlined" fullWidth>
              Generate Reports
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderWorkoutPlanner = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Workout Planner
        </Typography>
        <TextField
          fullWidth
          label="Member Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Fitness Goal"
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Generate Workout Plan
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Fitness Specialist Dashboard</Typography>
        <Box>
          <Chip icon={<AlertTriangle />} label="3 Members Need Attention" color="warning" />
          <IconButton onClick={handleClick}>
            <MoreVertical />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Customize Dashboard</MenuItem>
            <MenuItem onClick={handleClose}>Export Reports</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {fitnessMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            {renderMetricCard(metric)}
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          {renderProgressChart()}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderAssessmentsList()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderMemberProgress()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderWorkoutPlanner()}
        </Grid>
        <Grid item xs={12}>
          {renderQuickLinks()}
        </Grid>
      </Grid>
    </div>
  );
};

export default FitnessSpecialistDashboard;