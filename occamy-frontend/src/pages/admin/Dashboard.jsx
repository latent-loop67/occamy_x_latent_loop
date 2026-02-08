import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    officers: "—",
    meetings: "—",
    samples: "—",
    sales: "—",
    attendance: "—",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      const [meetingsRes, samplesRes, attendanceRes, salesRes] =
        await Promise.all([
          axios.get("http://localhost:8000/api/meetings/list/", { headers }),
          axios.get("http://localhost:8000/api/samples/report/", { headers }),
          axios.get("http://localhost:8000/api/attendance/list/", { headers }),
          axios.get("http://localhost:8000/api/sales/list/", { headers }),
        ]);

      setStats({
        officers: "—", // optional if you add users count API later
        meetings: meetingsRes.data.length,
        samples: samplesRes.data.length,
        attendance: attendanceRes.data.length,
        sales: salesRes.data.length,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h2>Admin Panel – {user?.username}</h2>
        <button
          onClick={logout}
          style={styles.logout}
          onMouseOver={(e) => (e.target.style.background = "#dc2626")}
          onMouseOut={(e) => (e.target.style.background = "#ef4444")}
        >
          Logout
        </button>
      </header>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Field Officers" value={stats.officers} />
        <Stat title="Meetings Logged" value={stats.meetings} />
        <Stat title="Samples Distributed" value={stats.samples} />
        <Stat title="Total Sales" value={stats.sales} />
        <Stat title="Attendance Records" value={stats.attendance} />
      </div>

      {/* ACTION CARDS */}
      <div style={styles.grid}>
        <Card
          title="Log Meeting"
          desc="Create a new field meeting"
          icon="📝"
          onClick={() => navigate("/admin/meetings/create")}
        />
        <Card
          title="View Meetings"
          desc="See all logged meetings"
          icon="📋"
          onClick={() => navigate("/admin/meetings")}
        />
        <Card
          title="Mark Attendance"
          desc="Mark attendance for field officers"
          icon="✍️"
          onClick={() => navigate("/admin/attendance/mark")}
        />
        <Card
          title="View Attendance"
          desc="View and manage all attendance records"
          icon="✅"
          onClick={() => navigate("/admin/attendance")}
        />
        <Card
          title="Record Sample"
          desc="Log a sample distribution"
          icon="📦"
          onClick={() => navigate("/admin/samples/create")}
        />
        <Card
          title="View Sample Report"
          desc="See all distributed samples"
          icon="📊"
          onClick={() => navigate("/admin/samples/report")}
        />
      </div>
    </div>
  );
}

function Card({ title, desc, icon, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardHeader}>
        <span style={styles.cardIcon}>{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
      <span style={styles.link}>Open →</span>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.stat}>
      <h4>{title}</h4>
      <strong>{value}</strong>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    padding: "40px 50px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logout: {
    background: "#ef4444",
    padding: "10px 18px",
    borderRadius: 8,
    color: "white",
    cursor: "pointer",
    border: "none",
    fontWeight: 600,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 20,
    marginBottom: 50,
  },
  stat: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 14,
    border: "1px solid #334155",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 30,
  },
  card: {
    background: "#1e293b",
    padding: 28,
    borderRadius: 16,
    border: "1px solid #334155",
    cursor: "pointer",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  cardIcon: { fontSize: 26 },
  link: {
    marginTop: 14,
    display: "inline-block",
    color: "#38bdf8",
    fontWeight: 600,
  },
};
