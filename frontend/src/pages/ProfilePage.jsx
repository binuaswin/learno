import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfilePage.css";

import SkillDevelopmentTracker from "../components/SkillDevelopmentTracker";
import StudyPlannerOverview from "../components/StudyPlannerOverview";
import SettingsAndPreferences from "../components/SettingAndPreferences";
import UserActivityLog from "../components/UserActivityLog";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({ name: "", username: "", email: "", phone: "", bio: "", location: "", profileImage: "" });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    profileImage: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setProfileData(res.data.user);
        setFormData(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB.");
        return;
      }
      if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
        toast.error("Only JPEG, PNG, or GIF images are allowed.");
        return;
      }
      setSelectedFile(file);
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      const fields = ['name', 'username', 'email', 'phone', 'bio', 'location'];
      fields.forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (selectedFile) {
        formDataToSend.append("profileImage", selectedFile);
      }

      const formDataEntries = {};
      for (let [key, value] of formDataToSend.entries()) {
        formDataEntries[key] = value instanceof File ? value.name : value;
      }
      console.log("Sending profile data:", formDataEntries);

      const res = await axios.put("http://localhost:5000/api/profile/me", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setProfileData(res.data.user);
      setFormData(res.data.user); // Sync formData with server response
      setSelectedFile(null);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error updating profile. Check file type or size.");
    }
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const containerClass = theme === "light" ? "light-theme" : "dark-theme";

  if (loading) return <div className="loading-message">Loading profile...</div>;

  return (
    <div className={`profile-container ${containerClass}`}>
      <ToastContainer position="top-right" />
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <h2>User Profile</h2>
            <button onClick={toggleTheme} className="toggle-btn">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>

          <div className="profile-picture-section">
            <img
              src={
                profileData.profileImage
                  ? `http://localhost:5000${profileData.profileImage}?t=${Date.now()}`
                  : "https://via.placeholder.com/120"
              }
              alt="Profile"
              className="profile-picture"
              onError={() => toast.error("Failed to load profile image")}
            />
            {editMode && (
              <input
                type="file"
                name="profileImage"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleChange}
                className="file-input"
              />
            )}
          </div>

          <div className="form-section">
            {editMode && (
              <div className="edit-hint">
                ✏️ You are in edit mode. Don’t forget to save your changes!
              </div>
            )}

            {[
              { label: "Full Name", name: "name" },
              { label: "Username", name: "username" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "tel" },
              { label: "Location", name: "location" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="form-group">
                <label>{label}</label>
                {editMode ? (
                  <input
                    type={type}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-content">{profileData[name]}</p>
                )}
              </div>
            ))}

            <div className="form-group">
              <label>Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="text-content">{profileData.bio}</p>
              )}
            </div>

            <div className="form-group">
              <label>Account Status</label>
              <p className="status-text">
                {profileData.status || "Active"}
              </p>
            </div>

            <div className="button-group">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="save-btn">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setFormData(profileData);
                      setSelectedFile(null);
                      setEditMode(false);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="edit-btn"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>🎯 Skill Development</h3>
          <SkillDevelopmentTracker />
        </div>

        <div className="profile-section">
          <h3>🧠 Study Planner Overview</h3>
          <StudyPlannerOverview />
        </div>

        <div className="profile-section">
          <h3>⚙️ Settings & Preferences</h3>
          <SettingsAndPreferences />
        </div>

        <div className="profile-section">
          <h3>📊 User Activity Log</h3>
          <UserActivityLog />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;