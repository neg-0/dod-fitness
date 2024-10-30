import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  Weight,
  Calendar,
  FileText,
  Plus,
  Settings,
  Activity,
  Target,
  Bell,
} from 'lucide-react';
import { DashboardModule } from '../moduleRegistry';
import { UserRole, useAuth } from '../../../contexts/AuthContext';
import { useDashboard } from '../../../contexts/DashboardContext';

interface Action {
  id: string;
  name: string;
  icon: React.ElementType;
  tooltip: string;
}

const availableActions: { [key in UserRole]: Action[] } = {
  BaseMember: [
    { id: 'logWeight', name: 'Log Weight', icon: Weight, tooltip: 'Record your daily weight' },
    { id: 'scheduleWorkout', name: 'Schedule', icon: Calendar, tooltip: 'Plan your next workout' },
    { id: 'viewReports', name: 'Reports', icon: FileText, tooltip: 'Check your progress reports' },
    { id: 'trackActivity', name: 'Activity', icon: Activity, tooltip: 'Log your daily activities' },
    { id: 'setGoals', name: 'Goals', icon: Target, tooltip: 'Update your fitness goals' },
  ],
  UnitLeadership: [
    { id: 'viewReports', name: 'Reports', icon: FileText, tooltip: 'Review unit reports' },
    { id: 'scheduleAssessment', name: 'Schedule', icon: Calendar, tooltip: 'Plan fitness assessments' },
    { id: 'addAnnouncement', name: 'Announce', icon: Bell, tooltip: 'Post new announcements' },
  ],
  FitnessSpecialist: [
    { id: 'createWorkoutPlan', name: 'New Plan', icon: Plus, tooltip: 'Create a new workout plan' },
    { id: 'scheduleConsultation', name: 'Schedule', icon: Calendar, tooltip: 'Schedule consultations' },
    { id: 'viewMemberProgress', name: 'Progress', icon: Activity, tooltip: 'View member progress' },
  ],
  NutritionSpecialist: [
    { id: 'createMealPlan', name: 'New Plan', icon: Plus, tooltip: 'Create a new meal plan' },
    { id: 'scheduleConsultation', name: 'Schedule', icon: Calendar, tooltip: 'Schedule consultations' },
    { id: 'viewNutritionReports', name: 'Reports', icon: FileText, tooltip: 'View nutrition reports' },
  ],
  SystemAdministrator: [
    { id: 'manageUsers', name: 'Users', icon: Plus, tooltip: 'Manage system users' },
    { id: 'systemSettings', name: 'Settings', icon: Settings, tooltip: 'Configure system settings' },
    { id: 'viewLogs', name: 'Logs', icon: FileText, tooltip: 'View system logs' },
  ],
};

const BUTTON_SIZE = 56; // Base button size in pixels
const BUTTON_MARGIN = 16; // Margin between buttons
const MIN_BUTTONS_PER_ROW = 2;

const QuickActions: DashboardModule = () => {
  const { user } = useAuth();
  const { editMode } = useDashboard();
  const [actions, setActions] = useState<Action[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [buttonsPerRow, setButtonsPerRow] = useState(MIN_BUTTONS_PER_ROW);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const storedActions = localStorage.getItem(`quickActions_${user.id}`);
      if (storedActions) {
        setActions(JSON.parse(storedActions));
      } else {
        setActions(availableActions[user.role].slice(0, 3));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`quickActions_${user.id}`, JSON.stringify(actions));
    }
  }, [actions, user]);

  useEffect(() => {
    const updateButtonsPerRow = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const buttonWithMargin = BUTTON_SIZE + BUTTON_MARGIN * 2;
        const maxButtons = Math.max(
          MIN_BUTTONS_PER_ROW,
          Math.floor(containerWidth / buttonWithMargin)
        );
        setButtonsPerRow(maxButtons);
      }
    };

    const resizeObserver = new ResizeObserver(updateButtonsPerRow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

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

  const renderActionButton = (action: Action) => {
    const IconComponent = action.icon;
    return (
      <Box
        key={action.id}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          width: `${100 / buttonsPerRow}%`,
          padding: 1,
        }}
      >
        <Tooltip title={action.tooltip} arrow>
          <IconButton
            sx={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              mb: 1,
            }}
          >
            <IconComponent size={24} />
          </IconButton>
        </Tooltip>
        <Typography
          variant="caption"
          align="center"
          sx={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {action.name}
        </Typography>
        {editMode && (
          <IconButton
            size="small"
            onClick={() => handleRemoveAction(action.id)}
            sx={{
              position: 'absolute',
              top: -8,
              right: '50%',
              transform: 'translateX(28px)',
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              width: 20,
              height: 20,
              '&:hover': {
                backgroundColor: 'error.dark',
              },
              zIndex: 1003,
            }}
          >
            <Plus size={12} style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        )}
      </Box>
    );
  };

  const renderGhostButton = () => (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: `${100 / buttonsPerRow}%`,
        padding: 1,
      }}
    >
      <Tooltip title="Add Quick Action" arrow>
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            border: '2px dashed',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            },
            mb: 1,
            zIndex: 1003,
          }}
        >
          <Plus size={24} />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" align="center">
        Add Action
      </Typography>
    </Box>
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            mt: 1,
          }}
        >
          {actions.map((action) => renderActionButton(action))}
          {actions.length < 8 && renderGhostButton()}
        </Box>
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
              <MenuItem
                key={action.id}
                onClick={() => handleAddAction(action)}
                sx={{ gap: 1 }}
              >
                <action.icon size={16} />
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
  description: 'Access frequently used actions',
  icon: Activity,
  defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 },
  roles: [
    'BaseMember',
    'UnitLeadership',
    'FitnessSpecialist',
    'NutritionSpecialist',
    'SystemAdministrator',
  ] as UserRole[],
};

export default QuickActions;