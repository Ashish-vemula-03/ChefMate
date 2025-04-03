import { useState, useEffect, useCallback } from "react";
import axios from "../services/axios";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        try {
          const res = await axios.get("/users/profile");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };
    fetchUser();
  }, []);

  const toggleDropdown = useCallback((index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  }, [openDropdown]);

  const handleEditToggle = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/users/update", user);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setEditMode(false);
      alert("Profile updated successfully! ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first! ❌");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    setLoading(true);
    try {
      const res = await axios.post("/users/upload-profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        const updatedUser = { ...user, profilePicture: res.data.profilePicture };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile photo updated successfully! ✅");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile photo ❌. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user?.profilePicture || localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).profilePicture : "/default-profile.png"}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h2>{user?.username || "User Name"}</h2>
          <p>{user?.email || "user@example.com"}</p>
          <p>{user?.mobile || "No mobile number added"}</p>
        </div>
      </div>

      
      <div className="profile-dropdowns">
        {["Account Settings", "Saved Recipes", "Preferences"].map((title, index) => (
          <div key={index} className="dropdown">
            <button className="dropdown-header" onClick={() => toggleDropdown(index)}>
              {title}
              <span className={openDropdown === index ? "arrow up" : "arrow down"}></span>
            </button>
            {openDropdown === index && (
              <div className="dropdown-content">
                {index === 0 && (
                  <div className="account-settings">
                    <label>Username:</label>
                    <input type="text" name="username" value={user?.username || ""} onChange={handleChange} disabled={!editMode} />

                    <label>Email:</label>
                    <input type="email" name="email" value={user?.email || ""} onChange={handleChange} disabled={!editMode} />

                    <label>Mobile Number:</label>
                    <input type="text" name="mobile" value={user?.mobile || ""} onChange={handleChange} disabled={!editMode} />

                 
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={!editMode} />
        <button onClick={handleUpload} className="upload-btn" disabled={loading || !editMode}>
          {loading ? "Uploading..." : "Upload Photo"}
        </button >
      

                    {editMode ? (
                      <button className="save-btn" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    ) : (
                      <button className="edit-btn" onClick={handleEditToggle}>
                        Edit Profile
                      </button>
                    )}
                  </div>
                )}

                {index === 1 && <p>View your favorite and saved recipes.</p>}
                {index === 2 && <p>Manage your dietary preferences and settings.</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
