import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dash from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LearningModules from "./pages/LearningModules";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learningmodule" element={<LearningModules />} />
      </Routes>
    </Router>
  );
};

export default App;
