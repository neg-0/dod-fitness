import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import { Plus } from 'lucide-react';
import TodaysWorkout from '../components/dashboard/TodaysWorkout';
import NutritionPlan from '../components/dashboard/NutritionPlan';
import ProgressGoals from '../components/dashboard/ProgressGoals';
import QuickActions from '../components/dashboard/QuickActions';
import DailyMotivation from '../components/dashboard/DailyMotivation';
import LocalEvents from '../components/dashboard/LocalEvents';
import NutritionRecommendations from '../components/dashboard/NutritionRecommendations';
import SpecialistAdvice from '../components/dashboard/SpecialistAdvice';
import Announcements from '../components/dashboard/Announcements';

const ResponsiveGridLayout = WidthProvider(Responsive);

const BaseMemberDashboard: React.FC = () => {
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'workout', x: 0, y: 0, w: 6, h: 4 },
      { i: 'nutrition', x: 6, y: 0, w: 6, h: 4 },
      { i: 'progress', x: 0, y: 4, w: 4, h: 4 },
      { i: 'actions', x: 4, y: 4, w: 4, h: 2 },
      { i: 'motivation', x: 8, y: 4, w: 4, h: 2 },
      { i: 'events', x: 4, y: 6, w: 4, h: 2 },
      { i: 'recommendations', x: 8, y: 6, w: 4, h: 2 },
      { i: 'advice', x: 0, y: 8, w: 6, h: 3 },
      { i: 'announcements', x: 6, y: 8, w: 6, h: 3 },
    ],
  });

  const [activeModules, setActiveModules] = useState([
    'workout', 'nutrition', 'progress', 'actions', 'motivation',
    'events', 'recommendations', 'advice', 'announcements'
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLayoutChange = (layout: any, layouts: any) => {
    setLayouts(layouts);
  };

  const handleAddModule = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModuleToggle = (moduleId: string) => {
    if (activeModules.includes(moduleId)) {
      setActiveModules(activeModules.filter(id => id !== moduleId));
    } else {
      setActiveModules([...activeModules, moduleId]);
    }
    handleMenuClose();
  };

  const moduleComponents: { [key: string]: React.ReactNode } = {
    workout: <TodaysWorkout />,
    nutrition: <NutritionPlan />,
    progress: <ProgressGoals />,
    actions: <QuickActions />,
    motivation: <DailyMotivation />,
    events: <LocalEvents />,
    recommendations: <NutritionRecommendations />,
    advice: <SpecialistAdvice />,
    announcements: <Announcements />,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Your Fitness Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus />}
          onClick={handleAddModule}
        >
          Add Module
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {Object.keys(moduleComponents).map((moduleId) => (
          <MenuItem
            key={moduleId}
            onClick={() => handleModuleToggle(moduleId)}
          >
            {activeModules.includes(moduleId) ? '✓ ' : ''}
            {moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}
          </MenuItem>
        ))}
      </Menu>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
      >
        {activeModules.map((moduleId) => (
          <div key={moduleId}>
            {moduleComponents[moduleId]}
          </div>
        ))}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default BaseMemberDashboard;