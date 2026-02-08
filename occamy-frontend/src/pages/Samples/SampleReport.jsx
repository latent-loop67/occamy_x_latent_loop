import { useState, useEffect } from "react";
import axios from "axios";
import "./Sample.css";

export default function SampleReport() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:8000/api/samples/report/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSamples(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch samples:", err.response || err);
      setError("Failed to fetch sample records. Check backend connection.");
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading samples...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="sample-report-container">
      <h2>Sample Distribution Report</h2>
      <table className="sample-table">
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Purpose</th>
            <th>Date Given</th>
            <th>Notes</th>
            <th>Given By</th>
          </tr>
        </thead>
        <tbody>
          {samples.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No sample records found.
              </td>
            </tr>
          ) : (
            samples.map((s) => (
              <tr key={s.id}>
                <td>{s.receiver_name}</td>
                <td>{s.receiver_category}</td>
                <td>{s.quantity}</td>
                <td>{s.purpose}</td>
                <td>{new Date(s.date_given).toLocaleDateString()}</td>
                <td>{s.notes || "-"}</td>
                <td>{s.given_by}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
