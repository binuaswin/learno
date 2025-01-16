
import { Link } from "react-router-dom";
import "./Dashboard.css";
import NavigationBar from "../components/NavigationBar";

const Dashboard = () => {
  
    
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <NavigationBar />
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Adaptive Learning</h2>
          <p>Explore personalized learning paths tailored to your skills.</p>
          <Link to="/adaptivelearn" className="dashboard-button" >Go to Learning</Link>
        </section>
        <section className="dashboard-section">
          <h2>Study Planner</h2>
          <p>Plan and track your study schedule effectively.</p>
          <Link to="/studyplanner" className="dashboard-button">Open Planner</Link>
        </section>
        <section className="dashboard-section">
          <h2>Skill Development</h2>
          <p>Track and improve your skill set.</p>
          <Link to="/skilldev" className="dashboard-button">Track Skills</Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
