import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
//import Dash from "./pages/Dashboard";
import Profile from "./pages/ProfilePage";
import StudyPlanner from "./pages/StudyPlanner";
import SkillDevelopmentPlanner from "./pages/SkillDevelopmentPlanner";
import ProgressDashboard from "./pages/ProgressDashboard";
import LogoutPage from "./pages/LogoutPage";
import { ThemeProvider } from "./components/ThemeContext"; // Import the ThemeProvider
import AdaptiveLearningPage from "./pages/AdaptiveLearningPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register the required components (including CategoryScale)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  
);



const App = () => {
 
   
  
  return (
    <ThemeProvider>
    <Router>
  
       
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/studyplanner" element={<StudyPlanner />} />
        <Route path="/skilldev" element={<SkillDevelopmentPlanner />} />
        <Route path="/progress" element={<ProgressDashboard />} />
        <Route path="/adaptivelearn" element={<AdaptiveLearningPage />} />
        <Route path="/logout" element={<LogoutPage />}/>

      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
