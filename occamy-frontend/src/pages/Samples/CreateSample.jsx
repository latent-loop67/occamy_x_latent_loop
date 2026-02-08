import { useState } from "react";
import axios from "axios";
import "./Sample.css";

export default function CreateSample() {
  const [receiverName, setReceiverName] = useState("");
  const [receiverCategory, setReceiverCategory] = useState("FARMER");
  const [quantity, setQuantity] = useState("");
  const [purpose, setPurpose] = useState("TRIAL");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receiverName || !quantity) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://localhost:8000/api/samples/create/",
        {
          receiver_name: receiverName,
          receiver_category: receiverCategory,
          quantity: parseInt(quantity),
          purpose,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Sample recorded successfully!");
      setReceiverName("");
      setReceiverCategory("FARMER");
      setQuantity("");
      setPurpose("TRIAL");
      setNotes("");
      setLoading(false);
    } catch (err) {
      console.error("Failed to record sample:", err.response || err);
      setLoading(false);
      alert("Failed to record sample. Check backend and try again.");
    }
  };

  return (
    <div className="sample-form-container">
      <h2>Record Sample Distribution</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Receiver Name:</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div className="form-row">
          <label>Receiver Category:</label>
          <select
            value={receiverCategory}
            onChange={(e) => setReceiverCategory(e.target.value)}
          >
            <option value="FARMER">Farmer</option>
            <option value="SELLER">Seller</option>
            <option value="INFLUENCER">Influencer</option>
          </select>
        </div>

        <div className="form-row">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <div className="form-row">
          <label>Purpose:</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option value="TRIAL">Trial</option>
            <option value="DEMO">Demo</option>
            <option value="FOLLOW_UP">Follow Up</option>
          </select>
        </div>

        <div className="form-row">
          <label>Notes (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes"
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Recording..." : "Record Sample"}
          </button>
        </div>
      </form>
    </div>
  );
}
