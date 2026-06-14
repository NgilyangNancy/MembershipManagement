import { useEffect, useState } from "react";
import api from "../services/api";

export default function Announcements() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get("/announcements").then((r) => setList(r.data)); }, []);

  return (
    <div>
      <h2 className="mb-3">Announcements</h2>
      {list.map((a) => (
        <div className="card mb-2" key={a._id}><div className="card-body">
          <h5 className="mb-1">{a.title}</h5>
          <small className="text-muted">{new Date(a.createdAt).toLocaleString()}</small>
          <p className="mt-2 mb-0">{a.body}</p>
        </div></div>
      ))}
      {list.length === 0 && <p className="text-muted">No announcements yet.</p>}
    </div>
  );
}
