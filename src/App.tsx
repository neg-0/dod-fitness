import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import WorkoutPlan from './pages/WorkoutPlan';
import NutritionPlan from './pages/NutritionPlan';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Messages from './pages/Messages';
import ChatIcon from './components/chat/ChatIcon';
import ChatWindow from './components/chat/ChatWindow';
import { createBranchTheme, MilitaryBranch } from './theme/theme';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [branch, setBranch] = useState<MilitaryBranch>('Space Force');
  const [theme, setTheme] = useState(createBranchTheme(branch));

  useEffect(() => {
    setTheme(createBranchTheme(branch));
  }, [branch]);

  const handleLogout = () => {
    logout();
  };

  const handleBranchChange = (newBranch: MilitaryBranch) => {
    setBranch(newBranch);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen bg-gray-100">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workout-plan"
              element={
                <ProtectedRoute allowedRoles={['BaseMember', 'FitnessSpecialist']}>
                  <WorkoutPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nutrition-plan"
              element={
                <ProtectedRoute allowedRoles={['BaseMember', 'NutritionSpecialist']}>
                  <NutritionPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile onBranchChange={handleBranchChange} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {isAuthenticated && (
        <>
          <ChatIcon onClick={() => setShowChat(true)} />
          {showChat && (
            <ChatWindow
              onClose={() => setShowChat(false)}
              userProfile={user}
              workoutData={null}
              nutritionData={null}
            />
          )}
        </>
      )}
    </ThemeProvider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;