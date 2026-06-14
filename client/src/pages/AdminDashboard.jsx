import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get("/reports/summary").then((r) => setS(r.data)); }, []);

  if (!s) return <p>Loading…</p>;

  const data = {
    labels: ["Users", "Active members", "Events", "Revenue (₹)"],
    datasets: [{ label: "Totals", data: [s.totalUsers, s.activeMembers, s.totalEvents, s.revenue], backgroundColor: ["#0d6efd", "#198754", "#fd7e14", "#6f42c1"] }],
  };

  return (
    <div>
      <h2 className="mb-3">Admin Dashboard</h2>
      <div className="row g-3 mb-4">
        {[["Users", s.totalUsers], ["Active Members", s.activeMembers], ["Events", s.totalEvents], ["Revenue", "₹" + s.revenue]].map(([l, v]) => (
          <div className="col-md-3" key={l}>
            <div className="card text-center"><div className="card-body"><h6 className="text-muted">{l}</h6><h3>{v}</h3></div></div>
          </div>
        ))}
      </div>
      <div className="card mb-4"><div className="card-body"><Bar data={data} /></div></div>
      <div className="d-flex gap-2 flex-wrap">
        <Link className="btn btn-outline-primary" to="/admin/plans">Manage Plans</Link>
        <Link className="btn btn-outline-primary" to="/admin/memberships">Memberships</Link>
        <Link className="btn btn-outline-primary" to="/admin/payments">Payments</Link>
        <Link className="btn btn-outline-primary" to="/admin/events">Events</Link>
      </div>
    </div>
  );
}
