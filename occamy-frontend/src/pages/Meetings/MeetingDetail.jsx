// File: src/pages/Meetings/MeetingDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MeetingDetail.css";

export default function MeetingDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // for redirect after deletion
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeeting();
  }, []);

  const fetchMeeting = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/meetings/list/");
      const found = res.data.find((m) => m.id === parseInt(id));
      if (found) setMeeting(found);
      else setError("Meeting not found");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch meeting details");
    }
  };

  // ---------------- Delete function ----------------
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meeting?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/meetings/delete/${id}/`);
      setLoading(false);
      alert("Meeting deleted successfully");
      navigate("/admin/meetings"); // redirect to meeting list
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Failed to delete meeting");
    }
  };

  if (!meeting) return <p style={{ textAlign: "center" }}>{error || "Loading..."}</p>;

  return (
    <div className="meeting-detail-container">
      <h2>Meeting Details</h2>

      {/* Photo */}
      {meeting.photo ? (
        <img
          src={`http://127.0.0.1:8000${meeting.photo}`}
          alt="meeting"
          className="meeting-photo"
        />
      ) : (
        <div className="no-photo">No Photo Available</div>
      )}

      {/* Info Section */}
      <div className="meeting-info">
        <div className="info-row"><span>Type:</span> {meeting.meeting_type}</div>
        {meeting.person_name && (
          <div className="info-row"><span>Person:</span> {meeting.person_name}</div>
        )}
        {meeting.category && (
          <div className="info-row"><span>Category:</span> {meeting.category}</div>
        )}
        <div className="info-row"><span>Village:</span> {meeting.village}</div>
        {meeting.attendees_count && (
          <div className="info-row"><span>Attendees:</span> {meeting.attendees_count}</div>
        )}
        {meeting.business_potential && (
          <div className="info-row"><span>Business Potential:</span> {meeting.business_potential}</div>
        )}
      </div>

      {/* Google Maps */}
      {meeting.latitude && meeting.longitude && (
        <div className="map-container">
          <iframe
            title="meeting-location"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${meeting.latitude},${meeting.longitude}&hl=es;z=15&output=embed`}
          ></iframe>
        </div>
      )}

      {/* Delete Button */}
      <div style={{ textAlign: "center", marginTop: 25 }}>
        <button
          onClick={handleDelete}
          className="btn-delete"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Meeting"}
        </button>
      </div>
    </div>
  );
}
