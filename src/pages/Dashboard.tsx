import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Typography, Box, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import { moduleRegistry } from '../components/dashboard/moduleRegistry';
import ModuleWrapper from '../components/dashboard/modules/ModuleWrapper';
import AddModuleModal from '../components/dashboard/AddModuleModal';
import { useAuth } from '../contexts/AuthContext';
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const { editMode, setEditMode } = useDashboard();
  const [layouts, setLayouts] = useState<{ lg: Array<any> }>({ lg: [] });
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const userModules = moduleRegistry.getForRole(user.role).map((module) => module.moduleMetadata.id);
      setActiveModules(userModules);

      const initialLayouts = {
        lg: userModules.map((moduleId, index) => {
          const module = moduleRegistry.get(moduleId);
          return {
            i: moduleId,
            x: (index * 2) % 12,
            y: Math.floor(index / 6) * 4,
            w: module?.moduleMetadata.defaultLayout.w || 2,
            h: module?.moduleMetadata.defaultLayout.h || 2,
            minW: module?.moduleMetadata.defaultLayout.minW,
            maxW: module?.moduleMetadata.defaultLayout.maxW,
            minH: module?.moduleMetadata.defaultLayout.minH,
            maxH: module?.moduleMetadata.defaultLayout.maxH,
          };
        }),
      };
      setLayouts(initialLayouts);
    }
  }, [user]);

  const handleLayoutChange = (_layout: any, layouts: any) => {
    setLayouts(layouts);
  };

  const handleAddModule = (moduleId: string) => {
    if (!activeModules.includes(moduleId)) {
      setActiveModules([...activeModules, moduleId]);
      const module = moduleRegistry.get(moduleId);
      if (module) {
        setLayouts((prevLayouts) => ({
          ...prevLayouts,
          lg: [
            ...prevLayouts.lg,
            {
              i: moduleId,
              x: 0,
              y: Infinity,
              w: module.moduleMetadata.defaultLayout.w || 2,
              h: module.moduleMetadata.defaultLayout.h || 2,
              minW: module.moduleMetadata.defaultLayout.minW,
              maxW: module.moduleMetadata.defaultLayout.maxW,
              minH: module.moduleMetadata.defaultLayout.minH,
              maxH: module.moduleMetadata.defaultLayout.maxH,
            },
          ],
        }));
      }
    }
  };

  const deleteModule = (moduleId: string) => {
    setActiveModules(activeModules.filter((id) => id !== moduleId));
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: prevLayouts.lg.filter((item) => item.i !== moduleId),
    }));
  };

  const renderModule = (moduleId: string) => {
    const module = moduleRegistry.get(moduleId);
    if (!module) return null;
    const ModuleComponent = module;
    return (
      <div key={moduleId}>
        <ModuleWrapper
          editMode={editMode}
          onDelete={() => deleteModule(moduleId)}
        >
          <ModuleComponent />
        </ModuleWrapper>
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1,
        '.react-resizable-handle': {
          zIndex: 1003, // This ensures the resizable handle is above overlay element
        },
    }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Your Fitness Dashboard</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus />}
            onClick={() => setIsAddModuleModalOpen(true)}
            sx={{ mr: 2 }}
          >
            Add Module
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Save Layout' : 'Edit Layout'}
          </Button>
        </Box>
      </Box>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
      >
        {activeModules.map((moduleId) => renderModule(moduleId))}
      </ResponsiveGridLayout>
      <AddModuleModal
        open={isAddModuleModalOpen}
        onClose={() => setIsAddModuleModalOpen(false)}
        onAddModule={handleAddModule}
      />
    </Box>
  );
};

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;