// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudyPlanner from "./pages/StudyPlanner";
import SkillDevelopmentPlanner from "./pages/SkillDevelopmentPlanner";
import ProgressDashboard from "./pages/ProgressDashboard";
import LogoutPage from "./pages/LogoutPage";
import { ThemeProvider } from "./components/settings/ThemeContext";
import { ProfileProvider } from "./components/Home/ProfileContext";
import AdaptiveLearningPage from "./pages/AdaptiveLearningPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/common/Header";
import { useAuth } from "./components/auth/Authcontext"; // ✅ Updated import
import AuthProvider from "./components/auth/AuthProvider"; // ✅ Updated import
import ErrorBoundary from "./components/auth/ErrorBoundary";
import "./App.css";

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("App - Route changed to:", location.pathname);
  }, [location]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AppLayout = () => {
  const location = useLocation();
  const showHeader = !["/", "/signup"].includes(location.pathname);

  return (
    <div className="app-container">
      {showHeader && <Header className="fixed top-0 left-0 right-0 z-5" />}
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studyplanner"
          element={
            <ProtectedRoute>
              <StudyPlanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skilldev"
          element={
            <ProtectedRoute>
              <SkillDevelopmentPlanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adaptivelearn"
          element={
            <ProtectedRoute>
              <AdaptiveLearningPage />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ProfileProvider>
            <ErrorBoundary>
              <AppLayout />
            </ErrorBoundary>
          </ProfileProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
