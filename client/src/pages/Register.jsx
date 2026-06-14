import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try { await register(form); nav("/dashboard"); }
    catch (e) { setErr(e.response?.data?.message || "Registration failed"); }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm"><div className="card-body">
          <h3 className="mb-3">Create account</h3>
          {err && <div className="alert alert-danger">{err}</div>}
          <form onSubmit={onSubmit}>
            {["fullName", "email", "phone", "password"].map((k) => (
              <div className="mb-3" key={k}>
                <label className="form-label text-capitalize">{k}</label>
                <input type={k === "password" ? "password" : k === "email" ? "email" : "text"} className="form-control"
                  required={k !== "phone"} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
            <button className="btn btn-primary w-100">Register</button>
          </form>
          <p className="mt-3 mb-0 small">Have an account? <Link to="/login">Login</Link></p>
        </div></div>
      </div>
    </div>
  );
}
