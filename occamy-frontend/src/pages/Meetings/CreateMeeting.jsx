// File: src/pages/Meetings/CreateMeeting.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./CreateMeeting.css";

export default function CreateMeeting() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    meeting_type: "ONE_TO_ONE",
    category: "FARMER",
    person_name: "",
    village: "",
    attendees_count: 1,
    business_potential: "",
    latitude: "",
    longitude: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://127.0.0.1:8000/api/meetings/create/";

  // Auto-get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => console.log("Location not available", err)
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      if (files[0]) setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      for (let key in formData) {
        if (formData[key] !== null) {
          if (key === "latitude" || key === "longitude") {
            // Round latitude and longitude to 6 decimal places
            data.append(key, parseFloat(formData[key]).toFixed(6));
          } else {
            data.append(key, formData[key]);
          }
        }
      }

      // Add Authorization token if using JWT
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await axios.post(BACKEND_URL, data, { headers });

      setLoading(false);
      navigate("/admin/meetings"); // Redirect after success
    } catch (err) {
      setLoading(false);
      console.error(err.response || err);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Failed to create meeting. Please check all fields.");
      }
    }
  };

  return (
    <div className="meeting-card">
      <h2>Create Meeting</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="meeting-form">
        {/* Meeting Type + Category */}
        <div className="form-row">
          <div className="form-group">
            <label>Meeting Type</label>
            <select name="meeting_type" value={formData.meeting_type} onChange={handleChange}>
              <option value="ONE_TO_ONE">One to One</option>
              <option value="GROUP">Group</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="FARMER">Farmer</option>
              <option value="SELLER">Seller</option>
              <option value="INFLUENCER">Influencer</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Person Name</label>
          <input type="text" name="person_name" value={formData.person_name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Village</label>
          <input type="text" name="village" value={formData.village} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Attendees Count</label>
            <input
              type="number"
              name="attendees_count"
              value={formData.attendees_count}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Business Potential</label>
            <input type="text" name="business_potential" value={formData.business_potential} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude ? parseFloat(formData.latitude).toFixed(6) : ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude ? parseFloat(formData.longitude).toFixed(6) : ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input type="file" name="photo" onChange={handleChange} accept="image/*" />
          {photoPreview && <img src={photoPreview} alt="preview" className="photo-preview" />}
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>
    </div>
  );
}
