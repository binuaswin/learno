import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudyPlanner from "./pages/StudyPlanner";
import SkillDevelopmentPlanner from "./pages/SkillDevelopmentPlanner";
import ProgressDashboard from "./pages/ProgressDashboard";
import LogoutPage from "./pages/LogoutPage";
import { ThemeProvider } from "./components/ThemeContext";
import { ProfileProvider } from "./components/Home/ProfileContext";
import AdaptiveLearningPage from "./pages/AdaptiveLearningPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import PropTypes from "prop-types"; // Import PropTypes
import { useAuth } from "./components/authUtils"; // Import useAuth

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ProfileProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute><HomePage /></ProtectedRoute>}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
              />
              <Route
                path="/studyplanner"
                element={<ProtectedRoute><StudyPlanner /></ProtectedRoute>}
              />
              <Route
                path="/skilldev"
                element={<ProtectedRoute><SkillDevelopmentPlanner /></ProtectedRoute>}
              />
              <Route
                path="/progress"
                element={<ProtectedRoute><ProgressDashboard /></ProtectedRoute>}
              />
              <Route
                path="/adaptivelearn"
                element={<ProtectedRoute><AdaptiveLearningPage /></ProtectedRoute>}
              />
              <Route
                path="/logout"
                element={<LogoutPage />}
              />
            </Routes>
          </ProfileProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  return children;
};

// Add PropTypes validation for ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default App;