import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [mem, setMem] = useState([]);
  const [pay, setPay] = useState([]);

  useEffect(() => {
    api.get("/memberships/me").then((r) => setMem(r.data));
    api.get("/payments/me").then((r) => setPay(r.data));
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.fullName}</h2>
      <p className="text-muted">Role: {user?.role}</p>
      <div className="row g-3">
        <div className="col-md-6"><div className="card"><div className="card-body">
          <h5>My Memberships</h5>
          {mem.length === 0 && <p className="text-muted small">None yet. Visit Plans to subscribe.</p>}
          <ul className="list-group list-group-flush">
            {mem.map((m) => (
              <li key={m._id} className="list-group-item d-flex justify-content-between">
                <span>{m.plan?.name}</span>
                <span className={`badge bg-${m.status === "active" ? "success" : m.status === "pending" ? "warning" : "secondary"}`}>{m.status}</span>
              </li>
            ))}
          </ul>
        </div></div></div>
        <div className="col-md-6"><div className="card"><div className="card-body">
          <h5>My Payments</h5>
          {pay.length === 0 && <p className="text-muted small">No payments yet.</p>}
          <ul className="list-group list-group-flush">
            {pay.map((p) => (
              <li key={p._id} className="list-group-item d-flex justify-content-between">
                <span>₹{p.amount} — {p.method}</span>
                <span className={`badge bg-${p.status === "verified" ? "success" : "warning"}`}>{p.status}</span>
              </li>
            ))}
          </ul>
        </div></div></div>
      </div>
    </div>
  );
}
