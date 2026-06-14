import { useEffect, useState } from "react";
import api from "../services/api";

const FILES = import.meta.env.VITE_FILES_URL || "http://localhost:5000";

export default function AdminPayments() {
  const [list, setList] = useState([]);
  const load = () => api.get("/payments").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="mb-3">Payments</h2>
      <table className="table">
        <thead><tr><th>User</th><th>Amount</th><th>Method</th><th>Receipt</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {list.map((p) => (
            <tr key={p._id}>
              <td>{p.user?.fullName}</td>
              <td>₹{p.amount}</td>
              <td>{p.method}</td>
              <td>{p.receipt ? <a href={FILES + p.receipt} target="_blank">view</a> : "-"}</td>
              <td><span className={`badge bg-${p.status === "verified" ? "success" : "warning"}`}>{p.status}</span></td>
              <td>{p.status !== "verified" && <button className="btn btn-sm btn-success" onClick={async () => { await api.put(`/payments/${p._id}/verify`, { status: "verified" }); load(); }}>Verify</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
