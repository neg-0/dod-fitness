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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Users,
  Utensils,
  Calendar,
  FileText,
  Plus,
} from 'lucide-react';

// Mock data (replace with actual data fetching logic)
const nutritionMetrics = [
  { name: 'Avg. Nutrition Score', value: 78, trend: 'up' },
  { name: 'Meal Plan Adherence', value: 82, trend: 'up' },
  { name: 'Avg. Daily Calories', value: 2450, trend: 'down' },
  { name: 'Hydration Goal Met', value: 88, trend: 'up' },
];

const nutritionProgressData = [
  { month: 'Jan', avgScore: 74, adherence: 78, hydration: 82 },
  { month: 'Feb', avgScore: 76, adherence: 80, hydration: 85 },
  { month: 'Mar', avgScore: 77, adherence: 81, hydration: 87 },
  { month: 'Apr', avgScore: 78, adherence: 82, hydration: 88 },
];

const upcomingConsultations = [
  { id: 1, name: 'John Doe', date: '2023-05-15', reason: 'Weight Loss Plan' },
  { id: 2, name: 'Jane Smith', date: '2023-05-16', reason: 'Muscle Gain Diet' },
  { id: 3, name: 'Mike Johnson', date: '2023-05-18', reason: 'Nutritional Deficiency' },
];

const macronutrientDistribution = [
  { name: 'Protein', value: 30 },
  { name: 'Carbs', value: 45 },
  { name: 'Fat', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const NutritionSpecialistDashboard: React.FC = () => {
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

  const renderConsultationsList = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Consultations
        </Typography>
        <List>
          {upcomingConsultations.map((consultation) => (
            <ListItem key={consultation.id} disablePadding>
              <ListItemText
                primary={consultation.name}
                secondary={`Date: ${consultation.date} | Reason: ${consultation.reason}`}
              />
            </ListItem>
          ))}
        </List>
        <Button startIcon={<Plus />} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Schedule New Consultation
        </Button>
      </CardContent>
    </Card>
  );

  const renderProgressChart = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Nutrition Progress Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={nutritionProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgScore" name="Avg. Nutrition Score" stroke="#8884d8" />
            <Line type="monotone" dataKey="adherence" name="Meal Plan Adherence" stroke="#82ca9d" />
            <Line type="monotone" dataKey="hydration" name="Hydration Goal Met" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderMacronutrientDistribution = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Avg. Macronutrient Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={macronutrientDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {macronutrientDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
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
            <Button startIcon={<Utensils />} variant="outlined" fullWidth>
              Meal Plan Library
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

  const renderMealPlanner = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Meal Planner
        </Typography>
        <TextField
          fullWidth
          label="Member Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Dietary Restrictions"
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Generate Meal Plan
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Nutrition Specialist Dashboard</Typography>
        <Box>
          <Chip icon={<AlertTriangle />} label="2 Dietary Concerns" color="warning" />
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
        {nutritionMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            {renderMetricCard(metric)}
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          {renderProgressChart()}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderConsultationsList()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderMacronutrientDistribution()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderMealPlanner()}
        </Grid>
        <Grid item xs={12}>
          {renderQuickLinks()}
        </Grid>
      </Grid>
    </div>
  );
};

export default NutritionSpecialistDashboard;