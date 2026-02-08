import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2>Welcome, {user.username}</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </header>

      <div style={styles.grid}>
        <Card
          title="Start Day"
          desc="Begin field operations"
          onClick={() => alert("Start Day clicked")}
        />

        <Card
          title="Log Meeting"
          desc="Farmer / Seller / Influencer"
          onClick={() => navigate("/distributor/meetings/create")}
        />

        <Card
          title="Distribute Sample"
          desc="Record sample distribution"
          onClick={() => alert("Sample distribution")}
        />

        <Card
          title="Sales Entry"
          desc="B2C / B2B orders"
          onClick={() => alert("Sales entry")}
        />

        <Card
          title="End Day"
          desc="Close and submit daily report"
          onClick={() => alert("End day")}
        />
      </div>
    </div>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
