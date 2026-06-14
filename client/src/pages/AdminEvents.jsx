import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminEvents() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "", startsAt: "" });
  const load = () => api.get("/events").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/events", form);
    setForm({ title: "", description: "", location: "", startsAt: "" });
    load();
  };
  const del = async (id) => { if (confirm("Delete?")) { await api.delete(`/events/${id}`); load(); } };

  return (
    <div>
      <h2 className="mb-3">Manage Events</h2>
      <form className="card card-body mb-4" onSubmit={submit}>
        <div className="row g-2">
          <div className="col-md-4"><input className="form-control" placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="col-md-4"><input className="form-control" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="col-md-4"><input type="datetime-local" className="form-control" required value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} /></div>
          <div className="col-12"><textarea className="form-control" placeholder="Description" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="col-12"><button className="btn btn-primary">Add Event</button></div>
        </div>
      </form>
      <table className="table">
        <thead><tr><th>Title</th><th>When</th><th>Attendees</th><th></th></tr></thead>
        <tbody>
          {list.map((e) => (
            <tr key={e._id}>
              <td>{e.title}</td><td>{new Date(e.startsAt).toLocaleString()}</td><td>{e.attendees?.length || 0}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => del(e._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
