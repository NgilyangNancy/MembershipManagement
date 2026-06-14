import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const FILES = import.meta.env.VITE_FILES_URL || "http://localhost:5000";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || "", phone: user?.phone || "", bio: user?.bio || "" });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append("avatar", file);
    const { data } = await api.put("/users/me", fd, { headers: { "Content-Type": "multipart/form-data" } });
    setUser(data);
    setMsg("Saved");
  };

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        {user?.avatar
          ? <img src={FILES + user.avatar} alt="" className="img-fluid rounded-circle mb-2" style={{ maxWidth: 180 }} />
          : <div className="bg-secondary rounded-circle d-inline-block" style={{ width: 180, height: 180 }} />}
        <h5 className="mt-2">{user?.fullName}</h5>
        <p className="text-muted">{user?.email}</p>
      </div>
      <div className="col-md-8">
        <h3>Edit Profile</h3>
        {msg && <div className="alert alert-success py-2">{msg}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Full name</label>
            <input className="form-control" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></div>
          <div className="mb-3"><label className="form-label">Phone</label>
            <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div className="mb-3"><label className="form-label">Bio</label>
            <textarea className="form-control" rows="3" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          <div className="mb-3"><label className="form-label">Avatar</label>
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setFile(e.target.files[0])} /></div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
