import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, durationDays: 30, description: "", features: "" });
  const load = () => api.get("/plans").then((r) => setPlans(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/plans", { ...form, price: Number(form.price), durationDays: Number(form.durationDays), features: form.features.split(",").map((s) => s.trim()).filter(Boolean) });
    setForm({ name: "", price: 0, durationDays: 30, description: "", features: "" });
    load();
  };
  const del = async (id) => { if (confirm("Delete?")) { await api.delete(`/plans/${id}`); load(); } };

  return (
    <div>
      <h2 className="mb-3">Manage Plans</h2>
      <form className="card card-body mb-4" onSubmit={submit}>
        <div className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="col-md-2"><input type="number" className="form-control" placeholder="Price" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
          <div className="col-md-2"><input type="number" className="form-control" placeholder="Days" required value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: e.target.value })} /></div>
          <div className="col-md-5"><input className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="col-12"><input className="form-control" placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} /></div>
          <div className="col-12"><button className="btn btn-primary">Add Plan</button></div>
        </div>
      </form>
      <table className="table">
        <thead><tr><th>Name</th><th>Price</th><th>Days</th><th></th></tr></thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p._id}><td>{p.name}</td><td>₹{p.price}</td><td>{p.durationDays}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => del(p._id)}>Delete</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
