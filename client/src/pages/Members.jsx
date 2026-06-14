import { useEffect, useState } from "react";
import api from "../services/api";

export default function Members() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/users").then((r) => setUsers(r.data)).catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h2 className="mb-3">Members</h2>
      <table className="table table-striped">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}><td>{u.fullName}</td><td>{u.email}</td><td>{u.phone}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="text-muted small">Admin-only endpoint or no members.</p>}
    </div>
  );
}
