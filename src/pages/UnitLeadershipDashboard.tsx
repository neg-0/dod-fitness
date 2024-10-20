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
  Award,
  FileText,
} from 'lucide-react';

// Mock data (replace with actual data fetching logic)
const unitHealthData = [
  { name: 'Fitness Score', value: 85, trend: 'up' },
  { name: 'Nutrition Score', value: 78, trend: 'down' },
  { name: 'Mental Health', value: 92, trend: 'up' },
  { name: 'Readiness', value: 88, trend: 'up' },
];

const trendData = [
  { month: 'Jan', fitness: 80, nutrition: 75, mentalHealth: 85 },
  { month: 'Feb', fitness: 82, nutrition: 76, mentalHealth: 87 },
  { month: 'Mar', fitness: 85, nutrition: 78, mentalHealth: 90 },
  { month: 'Apr', fitness: 85, nutrition: 77, mentalHealth: 92 },
];

const issuesList = [
  { id: 1, title: 'Low fitness scores in Alpha Squad', priority: 'High' },
  { id: 2, title: 'Nutrition plan compliance in Bravo Team', priority: 'Medium' },
  { id: 3, title: 'Mental health concerns in Charlie Platoon', priority: 'High' },
];

const teamPerformance = [
  { name: 'Alpha Squad', score: 85 },
  { name: 'Bravo Team', score: 92 },
  { name: 'Charlie Platoon', score: 78 },
  { name: 'Delta Unit', score: 88 },
];

const UnitLeadershipDashboard: React.FC = () => {
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

  const renderIssuesList = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Issues
        </Typography>
        <List>
          {issuesList.map((issue) => (
            <ListItem key={issue.id} disablePadding>
              <ListItemText
                primary={issue.title}
                secondary={
                  <Chip
                    label={issue.priority}
                    color={issue.priority === 'High' ? 'error' : 'warning'}
                    size="small"
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderTrendChart = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Unit Health Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fitness" stroke="#8884d8" />
            <Line type="monotone" dataKey="nutrition" stroke="#82ca9d" />
            <Line type="monotone" dataKey="mentalHealth" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderTeamPerformance = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Performance
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" />
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
              Personnel Roster
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<Activity />} variant="outlined" fullWidth>
              Fitness Reports
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<Award />} variant="outlined" fullWidth>
              Commendations
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button startIcon={<FileText />} variant="outlined" fullWidth>
              Policy Documents
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Unit Leadership Dashboard</Typography>
        <Box>
          <Chip icon={<AlertTriangle />} label="2 Urgent Notifications" color="error" />
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
        {unitHealthData.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            {renderMetricCard(metric)}
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          {renderTrendChart()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderTeamPerformance()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderIssuesList()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderQuickLinks()}
        </Grid>
      </Grid>
    </div>
  );
};

export default UnitLeadershipDashboard;