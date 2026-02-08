import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Attendance.css";

export default function AttendanceList() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/attendance/list/"); // all records
      setAttendances(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to fetch attendance records");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/attendance/${id}/`);
      alert("Attendance record deleted successfully");
      setAttendances(attendances.filter((att) => att.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete record");
    }
  };

  return (
    <div className="attendance-list-container">
      <h2>Attendance Records</h2>
      {loading ? <p style={{ textAlign: "center" }}>Loading...</p> :
        attendances.length === 0 ? <p style={{ textAlign: "center" }}>No attendance records found.</p> :
        <div className="attendance-cards">
          {attendances.map(att => (
            <div key={att.id} className="attendance-card">
              <div className="info-row"><span>User:</span> {att.user}</div>
              <div className="info-row"><span>Date:</span> {att.date}</div>
              <div className="info-row"><span>Status:</span> {att.status}</div>
              <div className="info-row"><span>Marked At:</span> {new Date(att.marked_at).toLocaleString()}</div>
              <div className="card-actions">
                <button className="btn-delete" onClick={() => handleDelete(att.id)}>Delete</button>
                <button className="btn-view" onClick={() => navigate(`/admin/attendance/${att.id}`)}>View</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
