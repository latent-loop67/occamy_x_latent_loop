// File: src/pages/Meetings/MeetingList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MeetingList.css";

export default function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/meetings/list/");
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch meetings");
    }
  };

  return (
    <div className="meeting-list-container">
      <h2>Meeting List</h2>
      {error && <p className="error">{error}</p>}
      <Link to="/admin/meetings/create">
        <button className="btn-create">Create New Meeting</button>
      </Link>
      <div className="meeting-cards">
        {meetings.length === 0 && <p>No meetings yet.</p>}
        {meetings.map((m) => (
          <Link
            key={m.id}
            to={`/admin/meetings/${m.id}`}
            className="meeting-card"
          >
            <div className="card-image">
              {m.photo ? (
                <img src={`http://127.0.0.1:8000${m.photo}`} alt="meeting" />
              ) : (
                <div className="no-photo">No Photo</div>
              )}
            </div>
            <div className="card-content">
              <h3>{m.meeting_type}</h3>
              <p>
                <b>Person:</b> {m.person_name || "N/A"}
              </p>
              <p>
                <b>Category:</b> {m.category || "N/A"}
              </p>
              <p>
                <b>Village:</b> {m.village}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
