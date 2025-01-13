import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dash from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LearningModules from "./pages/LearningModules";
import StudyPlanner from "./pages/StudyPlanner";
import SkillDevelopmentPlanner from "./pages/SkillDevelopmentPlanner";
import ProgressDashboard from "./pages/ProgressDashboard";
import LogoutPage from "./pages/LogoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeContext"; // Import the ThemeProvider
import "./App.css";

const App = () => {
 
   
  
  return (
    <ThemeProvider>
    <Router>
  
       
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dash /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/learningmodule" element={<LearningModules />} />
        <Route path="/studyplanner" element={<StudyPlanner />} />
        <Route path="/skilldev" element={<SkillDevelopmentPlanner />} />
        <Route path="/progress" element={<ProgressDashboard />} />
        <Route path="/logout" element={<LogoutPage />}/>

      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
