import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import ProgressOverview from "../components/ProgressOverview";
import ActivityLogSection from "../components/ActivityLogSection";
import ProfilePictureUpdater from "../components/Home/ProfilePictureUpdater";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const profileResponse = await axios.get("http://localhost:5000/api/auth/profile", { // Fixed endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(profileResponse.data);
        setFormData({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          bio: profileResponse.data.bio || "",
        });

        const activitiesResponse = await axios.get("http://localhost:5000/api/auth/activities", { // Fixed endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(activitiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile", // Fixed endpoint
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <div className="flex items-center space-x-4 border-b pb-4">
          <ProfilePictureUpdater />
          <div>
            <h2 className="text-xl font-semibold text-black">User Profile</h2>
            <p className="text-sm text-black">Manage your account settings</p>
          </div>
        </div>
        {editMode ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input textarea"
              placeholder="Enter your bio"
            />
            <button type="submit" className="edit-profile-btn">Save</button>
            <button type="button" className="edit-profile-btn cancel" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-description">{user?.bio || "No bio set"}</p>
            <button className="edit-profile-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="achievements-container">
        <h3 className="achievements-title">Achievements</h3>
        <div className="achievements-grid">
          <div className="achievement-item">
            <p className="achievement-value">{user?.learning_progress?.length || 0}</p>
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

      <ProgressOverview />

      <div className="settings-container">
        <h3 className="settings-title">Settings</h3>
        <button className="settings-btn">Change Password</button>
        <button className="settings-btn">Update Preferences</button>
        <button className="settings-btn" onClick={handleLogout}>Logout</button>
      </div>

      <ActivityLogSection activities={activities} />
    </div>
  );
};

export default ProfilePage;