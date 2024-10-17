import { Profile } from '../api';

export const generateMockProfile = (): Profile => {
  return {
    id: '1',
    name: 'John Doe',
    age: 30,
    height: 70,
    weight: 180,
    branch: 'Army',
    fitnessWaivers: '',
    dietaryRestrictions: '',
  };
};