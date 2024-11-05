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
import { useApi } from '../hooks/useApi';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardContent: React.FC = () => {
  const { api } = useApi();
  const { user } = useAuth();
  const { editMode, setEditMode } = useDashboard();
  const [layouts, setLayouts] = useState<{ lg: Array<any> }>();
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     const userModules = moduleRegistry.getForRole(user.role);
  //     const moduleIds = userModules.map(module => module.moduleMetadata.id);
  //     setActiveModules(moduleIds);

  //     const initialLayouts = {
  //       lg: userModules.map(module => ({
  //         i: module.moduleMetadata.id,
  //         x: module.moduleMetadata.defaultLayout.x || 0,
  //         y: module.moduleMetadata.defaultLayout.y || 0,
  //         w: module.moduleMetadata.defaultLayout.w || 2,
  //         h: module.moduleMetadata.defaultLayout.h || 2,
  //         minW: module.moduleMetadata.defaultLayout.minW,
  //         maxW: module.moduleMetadata.defaultLayout.maxW,
  //         minH: module.moduleMetadata.defaultLayout.minH,
  //         maxH: module.moduleMetadata.defaultLayout.maxH,
  //       })),
  //     };
  //     // setLayouts(initialLayouts);
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchLayout = async () => {
      if (user) {
        const userModules = moduleRegistry.getForRole(user.role);
        const moduleIds = userModules.map(module => module.moduleMetadata.id);
        setActiveModules(moduleIds);

        try {
          const response = await api.dashboardLayoutGet();
          console.log("Dashboard layout resp", response.data.layout)
          setLayouts(response.data.layout);
        } catch (error) {
          console.error('Error fetching dashboard layout:', error);
        }
      }
    };

    fetchLayout();
  }, [api, user]);

  const handleLayoutChange = (newLayouts: any, allLayouts: any) => {
    console.log('changed layout', allLayouts)
    setLayouts(allLayouts);
  };

  const handleSaveLayout = () => {
    console.log('saving layout', layouts)
    // Save layout to the server
    api.dashboardLayoutPost(layouts)
      .then(() => {
        console.log('Layout saved successfully');
      })
      .catch((error: any) => {
        console.error('Error saving layout:', error);
      });
  }

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
    <Box sx={{
      flexGrow: 1,
      '.react-resizable-handle': {
        zIndex: 1003,
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
            onClick={() => {
              setEditMode(!editMode)
              if (editMode) { handleSaveLayout() }
            }}
          >
            {editMode ? 'Save Layout' : 'Edit Layout'}
          </Button>
        </Box>
      </Box>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
        margin={[16, 16]}
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