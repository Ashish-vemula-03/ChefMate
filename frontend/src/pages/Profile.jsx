import { useState, useEffect, useCallback } from "react";
import axios from "../services/axios";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });

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

  const toggleDropdown = useCallback(
    (index) => {
      setOpenDropdown(openDropdown === index ? null : index);
    },
    [openDropdown]
  );

  const handleEditToggle = useCallback(() => {
    if (!editMode && user) {
      setEditedUser({ ...user });
      setOpenDropdown(4); // Open Security Settings when entering edit mode
    }
    setEditMode(!editMode);
  }, [editMode, user]);

  const handleEditedChange = (e) => {
    setEditedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/users/update", editedUser);
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
    try {
      const res = await axios.put(
        "/users/update-personal-settings",
        editedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEditMode(false);
      alert("Personal settings updated successfully! ✅");
    } catch (err) {
      console.error("Error updating personal settings:", err);
      alert("Failed to update personal settings. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Please fill in both password fields ❌");
      return;
    }
    try {
      const res = await axios.post("/users/changepassword", passwordData);
      if (res.status === 200) {
        alert("Password changed successfully! ✅");
        setPasswordData({ currentPassword: "", newPassword: "" });
      }
    } catch (err) {
      console.error("Failed to change password:", err);
      alert(err.response?.data?.message || "Failed to change password ❌");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        setProfileImagePreview(null);
        alert("Profile photo updated successfully! ✅");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile photo ❌. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await axios.delete("/users/delete-account");
      localStorage.removeItem("user");
      alert("Your account has been deleted. Goodbye!");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again ❌");
    }
  };

  const profileImageSrc = profileImagePreview || user?.profilePicture || "/default-profile.png";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImageSrc} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{user?.username || "User Name"}</h2>
          <p>{user?.email || "user@example.com"}</p>
          <p>{user?.mobile || "No mobile number added"}</p>
        </div>
      </div>

      <div className="profile-dropdowns">
        {["Account Settings", "Personal Settings", "Security Settings"].map((title, index) => (
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
                    <input type="text" name="username" value={editMode ? editedUser?.username || "" : user?.username || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Email:</label>
                    <input type="email" name="email" value={editMode ? editedUser?.email || "" : user?.email || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Mobile Number:</label>
                    <input type="text" name="mobile" value={editMode ? editedUser?.mobile || "" : user?.mobile || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <input type="file" accept="image/*" onChange={handleFileChange} disabled={!editMode} />
                    {profileImagePreview && <img src={profileImagePreview} alt="Preview" className="preview-image" />}
                    <button onClick={handleUpload} className="upload-btn" disabled={loading || !editMode}>
                      {loading ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                )}

                {index === 1 && (
                  <div className="personal-settings">
                    <label>Age:</label>
                    <input type="number" name="age" value={editMode ? editedUser?.age || "" : user?.age || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Gender:</label>
                    <select name="gender" value={editMode ? editedUser?.gender || "" : user?.gender || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    <label>Weight (kg):</label>
                    <input type="number" name="weight" value={editMode ? editedUser?.weight || "" : user?.weight || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Height (cm):</label>
                    <input type="number" name="height" value={editMode ? editedUser?.height || "" : user?.height || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Cooking Skill Level:</label>
                    <select name="cookingSkill" value={editMode ? editedUser?.cookingSkill || "" : user?.cookingSkill || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode}>
                      <option value="">Select</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>

                    <label>Diet Preferences:</label>
                    <input type="text" name="dietPreferences" value={editMode ? editedUser?.dietPreferences || "" : user?.dietPreferences || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Allergies:</label>
                    <input type="text" name="allergies" value={editMode ? editedUser?.allergies || "" : user?.allergies || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />

                    <label>Preferred Cuisines:</label>
                    <input type="text" name="preferredCuisines" value={editMode ? editedUser?.preferredCuisines || "" : user?.preferredCuisines || ""} onChange={editMode ? handleEditedChange : undefined} disabled={!editMode} />
                  </div>
                )}

                {index === 2 && (
                  <div className="security-settings">
                    <label>Current Password:</label>
<input
  type="password"
  name="currentPassword"
  value={passwordData.currentPassword}
  onChange={handlePasswordChange}
  disabled={!editMode}
/>

<label>New Password:</label>
<input
  type="password"
  name="newPassword"
  value={passwordData.newPassword}
  onChange={handlePasswordChange}
  disabled={!editMode}
/>

<button
  className="save-btn"
  onClick={handleChangePassword}
  disabled={!editMode}
>
  Change Password
</button>

                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="profile-actions">
          <button className="edit-btn" onClick={handleEditToggle}>
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>
          <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
          {editMode && (
            <button className="save-btn" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
