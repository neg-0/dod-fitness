const STORAGE_PREFIX = 'dod_fitness_';

export const mockStorage = {
  setItem: (key: string, value: any) => {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  },
  getItem: (key: string) => {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  },
  removeItem: (key: string) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },
};