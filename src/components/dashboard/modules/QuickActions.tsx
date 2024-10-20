import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Weight,
  Calendar,
  FileText,
  Plus,
  Settings,
  Trash2,
} from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole, useAuth } from '../../../contexts/AuthContext';
import { useDashboard } from '../../../contexts/DashboardContext';

interface Action {
  id: string;
  name: string;
  icon: React.ElementType;
}

const availableActions: { [key in UserRole]: Action[] } = {
  BaseMember: [
    { id: 'logWeight', name: 'Log Weight', icon: Weight },
    { id: 'scheduleWorkout', name: 'Schedule Workout', icon: Calendar },
    { id: 'viewReports', name: 'View Reports', icon: FileText },
    { id: 'addGoal', name: 'Add Goal', icon: Plus },
  ],
  UnitLeadership: [
    { id: 'viewReports', name: 'View Reports', icon: FileText },
    { id: 'scheduleAssessment', name: 'Schedule Assessment', icon: Calendar },
    { id: 'addAnnouncement', name: 'Add Announcement', icon: Plus },
  ],
  FitnessSpecialist: [
    { id: 'createWorkoutPlan', name: 'Create Workout Plan', icon: Plus },
    {
      id: 'scheduleConsultation',
      name: 'Schedule Consultation',
      icon: Calendar,
    },
    { id: 'viewMemberProgress', name: 'View Member Progress', icon: FileText },
  ],
  NutritionSpecialist: [
    { id: 'createMealPlan', name: 'Create Meal Plan', icon: Plus },
    {
      id: 'scheduleConsultation',
      name: 'Schedule Consultation',
      icon: Calendar,
    },
    {
      id: 'viewNutritionReports',
      name: 'View Nutrition Reports',
      icon: FileText,
    },
  ],
  SystemAdministrator: [
    { id: 'manageUsers', name: 'Manage Users', icon: Plus },
    { id: 'systemSettings', name: 'System Settings', icon: Settings },
    { id: 'viewLogs', name: 'View Logs', icon: FileText },
  ],
};

const QuickActions: DashboardModule<{ size?: 'small' | 'medium' | 'large' }> = ({
  size = 'medium',
}) => {
  const { user } = useAuth();
  const { editMode } = useDashboard();
  const [actions, setActions] = useState<Action[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (user) {
      const storedActions = localStorage.getItem(`quickActions_${user.id}`);
      if (storedActions) {
        setActions(JSON.parse(storedActions));
      } else {
        setActions(availableActions[user.role].slice(0, 4));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`quickActions_${user.id}`, JSON.stringify(actions));
    }
  }, [actions, user]);

  const handleAddAction = (action: Action) => {
    setActions((prevActions) => [...prevActions, action]);
    setAnchorEl(null);
  };

  const handleRemoveAction = (actionId: string) => {
    setActions((prevActions) =>
      prevActions.filter((action) => action.id !== actionId)
    );
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderSmall = () => (
    <Grid container spacing={1}>
      {actions.slice(0, 2).map((action) => (
        <Grid item xs={6} key={action.id}>
          <Button
            variant="outlined"
            startIcon={<action.icon size={16} />}
            fullWidth
            size="small"
          >
            {action.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  const renderMedium = () => (
    <Grid container spacing={1}>
      {actions.map((action) => (
        <Grid item xs={6} key={action.id}>
          <Button
            variant="outlined"
            startIcon={<action.icon size={16} />}
            fullWidth
          >
            {action.name}
          </Button>
          {editMode && (
            <IconButton
              size="small"
              onClick={() => handleRemoveAction(action.id)}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Trash2 size={16} />
            </IconButton>
          )}
        </Grid>
      ))}
    </Grid>
  );

  const renderLarge = () => (
    <>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={6} key={action.id}>
            <Button variant="contained" startIcon={<action.icon />} fullWidth>
              {action.name}
            </Button>
            {editMode && (
              <IconButton
                size="small"
                onClick={() => handleRemoveAction(action.id)}
                sx={{ position: 'absolute', top: 0, right: 0 }}
              >
                <Trash2 size={16} />
              </IconButton>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardContent>
        {size === 'small' && renderSmall()}
        {size === 'medium' && renderMedium()}
        {size === 'large' && renderLarge()}
        {editMode && (
          <IconButton
            onClick={handleOpenMenu}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Settings size={24} />
          </IconButton>
        )}
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {user &&
          availableActions[user.role]
            .filter((action) => !actions.some((a) => a.id === action.id))
            .map((action) => (
              <MenuItem key={action.id} onClick={() => handleAddAction(action)}>
                <action.icon size={16} style={{ marginRight: 8 }} />
                {action.name}
              </MenuItem>
            ))}
      </Menu>
    </Card>
  );
};

QuickActions.moduleMetadata = {
  id: 'quickActions',
  title: 'Quick Actions',
  description: 'Perform common actions quickly',
  icon: Calendar,
  defaultLayout: { w: 2, h: 1, minW: 1, minH: 1 },
  roles: [
    'BaseMember',
    'UnitLeadership',
    'FitnessSpecialist',
    'NutritionSpecialist',
    'SystemAdministrator',
  ] as UserRole[],
};

export default QuickActions;
