import "./Profile.css";
import ProgressOverview from "../components/ProgressOverview";
import ActivityLogSection from "../components/ActivityLogSection";

const ProfilePage = () => {
  const activities = [
    {
      action: 'Completed module: Introduction to AI',
      timestamp: 1674852854000, // Example timestamp
    },
    {
      action: 'Updated skill: Python (Intermediate)',
      timestamp: 1676942983000, // Example timestamp
    },
    {
      action: 'Added task: Study Data Structures',
      timestamp: 1677029261000, // Example timestamp
    },
  ];

  return (
    <div className="profile-page-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/placeholder-avatar.png" alt="User Avatar" />
          <div className="avatar-fallback">AB</div>
        </div>
        <h2 className="profile-name">Aswin Binu</h2>
        <p className="profile-email">aswin@example.com</p>
        <p className="profile-description">M.Sc. Computer Science Student | AI Enthusiast</p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* Achievements Section */}
      <div className="achievements-container">
        <h3 className="achievements-title">Achievements</h3>
        <div className="achievements-grid">
          <div className="achievement-item">
            <p className="achievement-value">5</p>
            <p className="achievement-label">Modules Completed</p>
          </div>
          <div className="achievement-item">
            <p className="achievement-value">3</p>
            <p className="achievement-label">Skills Mastered</p>
          </div>
          <div className="achievement-item">
            <p className="achievement-value">10</p>
            <p className="achievement-label">Projects Completed</p>
          </div>
          <div className="achievement-item">
            <p className="achievement-value">15</p>
            <p className="achievement-label">Certificates Earned</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
        <ProgressOverview />

      {/* Settings Section */}
      <div className="settings-container">
        <h3 className="settings-title">Settings</h3>
        <button className="settings-btn">Change Password</button>
        <button className="settings-btn">Update Preferences</button>
        <button className="settings-btn">Logout</button>
      </div>

       <ActivityLogSection activities={activities}/>
    </div>
  );
};

export default ProfilePage;
