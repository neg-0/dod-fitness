import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkoutPlan from './pages/WorkoutPlan';
import NutritionPlan from './pages/NutritionPlan';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useApi } from './hooks/useApi';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B3157', // Navy blue
    },
    secondary: {
      main: '#D4AF37', // Gold
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition: 'transform 0.3s ease-in-out',
        },
      },
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, logout } = useApi();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/workout-plan" element={
            <ProtectedRoute>
              <WorkoutPlan />
            </ProtectedRoute>
          } />
          <Route path="/nutrition-plan" element={
            <ProtectedRoute>
              <NutritionPlan />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;