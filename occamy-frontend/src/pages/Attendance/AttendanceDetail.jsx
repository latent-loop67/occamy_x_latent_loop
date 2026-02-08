import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Attendance.css";

export default function AttendanceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/attendance/${id}/`);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch attendance record");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/attendance/${id}/`);
      setLoading(false);
      alert("Attendance record deleted successfully");
      navigate("/admin/attendance");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Failed to delete record");
    }
  };

  if (!attendance) return <p style={{ textAlign: "center" }}>{error || "Loading..."}</p>;

  return (
    <div className="attendance-detail-container">
      <h2>Attendance Details</h2>
      <div className="attendance-info">
        <div className="info-row"><span>User:</span> {attendance.user}</div>
        <div className="info-row"><span>Date:</span> {attendance.date}</div>
        <div className="info-row"><span>Status:</span> {attendance.status}</div>
        <div className="info-row"><span>Marked At:</span> {new Date(attendance.marked_at).toLocaleString()}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: 25 }}>
        <button onClick={handleDelete} className="btn-delete" disabled={loading}>
          {loading ? "Deleting..." : "Delete Attendance"}
        </button>
      </div>
    </div>
  );
}
