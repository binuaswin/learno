import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import NavigationBar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redirect to login if no token
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        navigate("/"); // Redirect on error (e.g., invalid token)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <NavigationBar />
      </header>
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="dashboard-section">
          <h2>Welcome back, {user?.name}!</h2>
          <p>{new Date().toLocaleString()}</p>
          <p>Let’s continue your learning journey with Learno.</p>
        </section>

        {/* Quick Stats */}
        <section className="dashboard-section">
          <h2>Quick Stats</h2>
          <div className="stats-container">
            <div className="stat-item">
              <p>Learning Progress: {user?.learning_progress?.length || 0} modules completed</p>
            </div>
            <div className="stat-item">
              <p>
                Study Tasks: {user?.study_tasks?.filter(t => t.status === "Completed").length || 0} /{" "}
                {user?.study_tasks?.length || 0} completed
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Shortcuts */}
        <section className="dashboard-section">
          <h2>Explore Learno</h2>
          <div className="nav-shortcuts">
            <Link to="/adaptivelearn" className="dashboard-button">Adaptive Learning</Link>
            <Link to="/studyplanner" className="dashboard-button">Study Planner</Link>
            <Link to="/skilldev" className="dashboard-button">Skill Development</Link>
          </div>
        </section>

        {/* Logout */}
        <section className="dashboard-section logout-section">
          <button className="dashboard-button logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;