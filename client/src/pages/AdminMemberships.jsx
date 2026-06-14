import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminMemberships() {
  const [list, setList] = useState([]);
  const load = () => api.get("/memberships").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="mb-3">Memberships</h2>
      <table className="table">
        <thead><tr><th>User</th><th>Plan</th><th>Status</th><th>End</th><th></th></tr></thead>
        <tbody>
          {list.map((m) => (
            <tr key={m._id}>
              <td>{m.user?.fullName}</td><td>{m.plan?.name}</td>
              <td><span className={`badge bg-${m.status === "active" ? "success" : m.status === "pending" ? "warning" : "secondary"}`}>{m.status}</span></td>
              <td>{m.endDate ? new Date(m.endDate).toLocaleDateString() : "-"}</td>
              <td>
                {m.status === "pending" && (
                  <>
                    <button className="btn btn-sm btn-success me-1" onClick={async () => { await api.put(`/memberships/${m._id}/approve`); load(); }}>Approve</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={async () => { await api.put(`/memberships/${m._id}/reject`); load(); }}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
