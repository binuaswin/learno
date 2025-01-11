import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dash from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LearningModules from "./pages/LearningModules";
import StudyPlanner from "./pages/StudyPlanner";
import SkillDevelopmentPlanner from "./pages/SkillDevelopmentPlanner";
import ProgressDashboard from "./pages/ProgressDashboard";

const App = () => {
  return (
    <Router>
       
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learningmodule" element={<LearningModules />} />
        <Route path="/studyplanner" element={<StudyPlanner />} />
        <Route path="/skilldev" element={<SkillDevelopmentPlanner />} />
        <Route path="/progress" element={<ProgressDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
