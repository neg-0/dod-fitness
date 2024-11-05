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
import Login from './pages/Login';
import Profile from './pages/Profile';
import WorkoutPlan from './pages/WorkoutPlan';
import NutritionPlan from './pages/NutritionPlan';
import Messages from './pages/Messages';
import Dashboard from './pages/Dashboard';
import UnitLeadershipDashboard from './pages/UnitLeadershipDashboard';
import FitnessSpecialistDashboard from './pages/FitnessSpecialistDashboard';
import NutritionSpecialistDashboard from './pages/NutritionSpecialistDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { createBranchTheme, MilitaryBranch } from './theme/theme';
import ChatIcon from './components/chat/ChatIcon';
import ChatWindow from './components/chat/ChatWindow';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();

  console.log('isAuth', isAuthenticated, 'user', user)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [branch, setBranch] = useState<MilitaryBranch>('Space Force');
  const [theme, setTheme] = useState(createBranchTheme(branch));
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setTheme(createBranchTheme(branch));
  }, [branch]);

  const handleLogout = () => {
    logout();
  };

  const handleBranchChange = (newBranch: MilitaryBranch) => {
    setBranch(newBranch);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`flex flex-col min-h-screen ${location.pathname === '/login' ? 'bg-[#2e2a2f]' : 'bg-gray-100'}`}>
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unit-leadership"
              element={
                <ProtectedRoute allowedRoles={['UnitLeadership']}>
                  <UnitLeadershipDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fitness-specialist"
              element={
                <ProtectedRoute allowedRoles={['FitnessSpecialist']}>
                  <FitnessSpecialistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nutrition-specialist"
              element={
                <ProtectedRoute allowedRoles={['NutritionSpecialist']}>
                  <NutritionSpecialistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workout-plan"
              element={
                <ProtectedRoute allowedRoles={['BaseMember']}>
                  <WorkoutPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/nutrition-plan"
              element={
                <ProtectedRoute allowedRoles={['BaseMember']}>
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
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
        {isAuthenticated && (
          <>
            <ChatIcon onClick={toggleChat} />
            {isChatOpen && (
              <ChatWindow
                onClose={() => setIsChatOpen(false)}
                userProfile={user}
                workoutData={{}}
                nutritionData={{}}
              />
            )}
          </>
        )}
      </div>
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