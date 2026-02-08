import { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css";

export default function MarkAttendance() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // user ID from dropdown
  const [manualUser, setManualUser] = useState(""); // manual typing
  const [status, setStatus] = useState("PRESENT");
  const [loading, setLoading] = useState(false);

  // Fetch all users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/accounts/list/");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.response || err);
      alert(
        "Failed to fetch users from backend. You can still type a user name manually."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userId = selectedUser;

    // If no user selected, try to match manual input
    if (!userId && manualUser) {
      const found = users.find(
        (u) =>
          `${u.username} ${u.surname || ""}`.toLowerCase() ===
          manualUser.trim().toLowerCase()
      );
      if (found) {
        userId = found.id;
      } else {
        alert(
          "User not found in system. Please select from dropdown or type exact name."
        );
        return;
      }
    }

    if (!userId) {
      alert("Please select a user or type a name.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/attendance/mark/", {
        user: userId, // send ID to backend
        status,
      });
      setLoading(false);
      alert("Attendance marked successfully!");
      setSelectedUser("");
      setManualUser("");
      setStatus("PRESENT");
    } catch (err) {
      console.error("Failed to mark attendance:", err.response || err);
      setLoading(false);
      alert(
        "Failed to mark attendance. Make sure backend is running and user ID is correct."
      );
    }
  };

  return (
    <div className="attendance-mark-container">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown */}
        <div className="form-row">
          <label>Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} {u.surname || ""}
              </option>
            ))}
          </select>
        </div>

        {/* Manual input */}
        <div className="form-row">
          <label>Or type exact name:</label>
          <input
            type="text"
            placeholder="Enter exact username + surname"
            value={manualUser}
            onChange={(e) => setManualUser(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="form-row">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        {/* Submit */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Marking..." : "Mark Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
}
