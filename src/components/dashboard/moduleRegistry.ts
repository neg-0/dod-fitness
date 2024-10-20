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
  };
  roles: UserRole[];
}

export interface DashboardModule extends FC {
  moduleMetadata: ModuleMetadata;
}

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
    return this.getAll().filter(module => module.moduleMetadata.roles.includes(role));
  }

  get(id: string): DashboardModule | undefined {
    return this.modules.get(id);
  }
}

export const moduleRegistry = new ModuleRegistry();