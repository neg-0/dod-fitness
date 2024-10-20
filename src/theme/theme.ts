import { createTheme, Theme } from '@mui/material/styles';

export type MilitaryBranch =
  | 'Army'
  | 'Navy'
  | 'Air Force'
  | 'Marine Corps'
  | 'Coast Guard'
  | 'Space Force';

const branchColors: Record<
  MilitaryBranch,
  { primary: string; secondary: string; text: string; background: string }
> = {
  Army: {
    primary: '#4B5320',
    secondary: '#FFF700',
    text: '#FFFFFF',
    background: '#F4F4F4',
  },
  Navy: {
    primary: '#000080',
    secondary: '#FFCC00',
    text: '#FFFFFF',
    background: '#F0F8FF',
  },
  'Air Force': {
    primary: '#0033A0',
    secondary: '#FFDE00',
    text: '#0033A0',
    background: '#F0F8FF',
  },
  'Marine Corps': {
    primary: '#1E4C2B',
    secondary: '#FFCC00',
    text: '#FFFFFF',
    background: '#F4FFF4',
  },
  'Coast Guard': {
    primary: '#003366',
    secondary: '#FF4500',
    text: '#FFFFFF',
    background: '#F0F8FF',
  },
  'Space Force': {
    primary: '#1C3E6E',
    secondary: '#E9E9E9',
    text: '#FFFFFF',
    background: '#F0F0F0',
  },
};

export const createBranchTheme = (branch: MilitaryBranch): Theme => {
  const colors = branchColors[branch];

  return createTheme({
    palette: {
      primary: {
        main: colors.primary,
        contrastText: colors.text,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.primary,
      },
      background: {
        default: colors.background,
        paper: '#FFFFFF',
      },
      text: {
        primary: colors.primary,
        secondary: '#666666', // Darker secondary text for better visibility
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.primary,
            color: colors.text,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-text': {
              color: colors.secondary,
            },
          },
          contained: {
            backgroundColor: colors.primary,
            color: colors.text,
            '&:hover': {
              backgroundColor: colors.secondary,
              color: colors.primary,
            },
          },
          outlined: {
            color: colors.primary,
            borderColor: colors.primary,
            '&:hover': {
              backgroundColor: colors.secondary,
              color: colors.primary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: colors.primary,
          },
          body1: {
            color: '#333333', // Darker color for body text
          },
          body2: {
            color: '#666666', // Slightly lighter color for secondary text
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: colors.primary,
          },
          secondary: {
            color: '#666666', // Darker color for secondary text in list items
          },
        },
      },
    },
  });
};

export default createBranchTheme('Space Force'); // Default theme
