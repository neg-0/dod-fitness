import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Utensils, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardModule } from '../moduleRegistry';
import { UserRole } from '../../../contexts/AuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

interface NutritionPlanProps {
  size?: 'small' | 'medium' | 'large';
}

const mockData = {
  dailyCalories: {
    current: 1850,
    goal: 2200,
  },
  macros: [
    { name: 'Protein', value: 30 },
    { name: 'Carbs', value: 45 },
    { name: 'Fat', value: 25 },
  ],
  meals: [
    { name: 'Breakfast', calories: 450, foods: ['Oatmeal', 'Banana', 'Protein Shake'] },
    { name: 'Lunch', calories: 650, foods: ['Grilled Chicken Salad', 'Quinoa'] },
    { name: 'Dinner', calories: 550, foods: ['Salmon', 'Brown Rice', 'Vegetables'] },
    { name: 'Snacks', calories: 200, foods: ['Greek Yogurt', 'Almonds'] },
  ],
  weeklyTrend: [
    { day: 'Mon', calories: 2100 },
    { day: 'Tue', calories: 2000 },
    { day: 'Wed', calories: 2300 },
    { day: 'Thu', calories: 1950 },
    { day: 'Fri', calories: 2150 },
    { day: 'Sat', calories: 2250 },
    { day: 'Sun', calories: 1850 },
  ],
  nutrients: [
    { name: 'Protein', current: 125, goal: 150, unit: 'g' },
    { name: 'Carbs', current: 220, goal: 275, unit: 'g' },
    { name: 'Fat', current: 55, goal: 70, unit: 'g' },
    { name: 'Fiber', current: 25, goal: 35, unit: 'g' },
  ],
  quickAdd: [
    { name: 'Protein Shake', calories: 150 },
    { name: 'Banana', calories: 105 },
    { name: 'Greek Yogurt', calories: 130 },
    { name: 'Almonds (1oz)', calories: 164 },
  ],
};

const NutritionPlan: React.FC<NutritionPlanProps> = ({ size = 'medium' }) => {
  const renderSmall = () => (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Today's Nutrition
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Calories: {mockData.dailyCalories.current} / {mockData.dailyCalories.goal}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(mockData.dailyCalories.current / mockData.dailyCalories.goal) * 100}
          sx={{ mb: 2 }}
        />
        <List dense>
          {mockData.meals.map((meal, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={meal.name}
                secondary={`${meal.calories} kcal`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<Plus />}
        sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}
      >
        Log Food
      </Button>
    </>
  );

  const renderMedium = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Daily Nutrition
        </Typography>
        <Box sx={{ height: 200, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.macros}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {mockData.macros.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {mockData.nutrients.map((nutrient, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2">
              {nutrient.name}: {nutrient.current}/{nutrient.goal}{nutrient.unit}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(nutrient.current / nutrient.goal) * 100}
            />
          </Box>
        ))}
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        Quick Add
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {mockData.quickAdd.map((food, index) => (
          <Chip
            key={index}
            label={`${food.name} (${food.calories} cal)`}
            onClick={() => {}}
            icon={<Plus size={16} />}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<Plus />}
      >
        Log Food
      </Button>
    </>
  );

  const renderLarge = () => (
    <>
      {renderMedium()}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Weekly Trend
        </Typography>
        <Box sx={{ height: 200, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Detailed Nutrition
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nutrient</TableCell>
                <TableCell align="right">Current</TableCell>
                <TableCell align="right">Goal</TableCell>
                <TableCell align="right">Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.nutrients.map((nutrient) => (
                <TableRow key={nutrient.name}>
                  <TableCell component="th" scope="row">
                    {nutrient.name}
                  </TableCell>
                  <TableCell align="right">{nutrient.current}{nutrient.unit}</TableCell>
                  <TableCell align="right">{nutrient.goal}{nutrient.unit}</TableCell>
                  <TableCell align="right">
                    {Math.round((nutrient.current / nutrient.goal) * 100)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<Plus />}>
            Create Meal Preset
          </Button>
          <Button variant="outlined" fullWidth>
            Meal Schedule
          </Button>
        </Box>
      </Box>
    </>
  );

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'auto' }}>
      <CardContent sx={{ height: '100%', pb: size === 'small' ? 8 : 2 }}>
        {size === 'small' && renderSmall()}
        {size === 'medium' && renderMedium()}
        {size === 'large' && renderLarge()}
      </CardContent>
    </Card>
  );
};

NutritionPlan.moduleMetadata = {
  id: 'nutritionPlan',
  title: "Nutrition Plan",
  description: "View your daily nutrition plan and macronutrient breakdown",
  icon: Utensils,
  defaultLayout: { w: 2, h: 4, minW: 1, minH: 1 },
  roles: ['BaseMember', 'UnitLeadership', 'NutritionSpecialist'] as UserRole[],
};

export default NutritionPlan;