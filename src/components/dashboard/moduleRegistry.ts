import { UserRole } from '../../contexts/AuthContext';
import { modules } from './modules';
import { FC } from 'react';

export interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  icon: FC;
  defaultLayout: {
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    x?: number;
    y?: number;
  };
  roles: UserRole[];
}

export interface DashboardModule<P = {}> extends FC<P> {
  moduleMetadata: ModuleMetadata;
}

// Define initial layouts for each role
const roleLayouts: Record<UserRole, Record<string, { x: number; y: number }>> = {
  BaseMember: {
    todaysWorkout: { x: 0, y: 0 },
    nutritionPlan: { x: 2, y: 0 },
    progressGoals: { x: 4, y: 0 },
    quickActions: { x: 0, y: 6 },
    dailyMotivation: { x: 4, y: 5 },
    localEvents: { x: 4, y: 5 },
    specialistAdvice: { x: 4, y: 2 },
    announcements: { x: 2, y: 5 },
    wellnessCheckIn: { x: 5, y: 0 }, // Added new module
  },
  UnitLeadership: {
    todaysWorkout: { x: 0, y: 0 },
    nutritionPlan: { x: 0, y: 4 },
    unitHealthMetrics: { x: 2, y: 2 },
    teamPerformance: { x: 2, y: 0 },
    quickActions: { x: 0, y: 9 },
    announcements: { x: 4, y: 4 },
    progressGoals: { x: 4, y: 2 },
    localEvents: { x: 0, y: 4 },
    dailyMotivation: { x: 2, y: 8 },
    specialistAdvice: { x: 4, y: 9 },
    wellnessCheckIn: { x: 5, y: 0 }, // Added new module
  },
  FitnessSpecialist: {
    teamPerformance: { x: 0, y: 0 },
    progressGoals: { x: 3, y: 0 },
    quickActions: { x: 0, y: 2 },
    specialistQueue: { x: 2, y: 2 },
    localEvents: { x: 4, y: 2 },
    announcements: { x: 0, y: 4 },
    wellnessCheckIn: { x: 5, y: 0 }, // Added new module
  },
  NutritionSpecialist: {
    nutritionPlan: { x: 0, y: 0 },
    nutritionRecommendations: { x: 2, y: 0 },
    quickActions: { x: 4, y: 0 },
    specialistQueue: { x: 0, y: 2 },
    teamPerformance: { x: 2, y: 2 },
    announcements: { x: 0, y: 4 },
    wellnessCheckIn: { x: 5, y: 0 }, // Added new module
  },
  SystemAdministrator: {
    quickActions: { x: 0, y: 0 },
    announcements: { x: 2, y: 0 },
    teamPerformance: { x: 0, y: 2 },
    unitHealthMetrics: { x: 3, y: 2 },
    wellnessCheckIn: { x: 5, y: 0 }, // Added new module
  },
};

class ModuleRegistry {
  private modules: Map<string, DashboardModule> = new Map();

  constructor() {
    this.registerAllModules();
  }

  private registerAllModules() {
    Object.values(modules).forEach(module => {
      if ('moduleMetadata' in module) {
        this.register(module as DashboardModule);
      }
    });
  }

  register(module: DashboardModule) {
    this.modules.set(module.moduleMetadata.id, module);
  }

  getAll(): DashboardModule[] {
    return Array.from(this.modules.values());
  }

  getForRole(role: UserRole): DashboardModule[] {
    const roleLayout = roleLayouts[role];
    return this.getAll()
      .filter(module => module.moduleMetadata.roles.includes(role))
      .map(module => {
        const layout = roleLayout[module.moduleMetadata.id];
        if (layout) {
          return {
            ...module,
            moduleMetadata: {
              ...module.moduleMetadata,
              defaultLayout: {
                ...module.moduleMetadata.defaultLayout,
                x: layout.x,
                y: layout.y,
              },
            },
          };
        }
        return module;
      });
  }

  get(id: string): DashboardModule | undefined {
    return this.modules.get(id);
  }
}

export const moduleRegistry = new ModuleRegistry();