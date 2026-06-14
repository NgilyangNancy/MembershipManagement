import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  
  // Added "role" to your form state tracking, defaulting to "member"
  const [form, setForm] = useState({ email: "", password: "", role: "member" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try { 
      // Passes email, password, AND role into your login context system
      await login(form.email, form.password, form.role); 
      nav("/dashboard"); 
    }
    catch (e) { 
      setErr(e.response?.data?.message || "Login failed"); 
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="mb-3">Sign in</h3>
            {err && <div className="alert alert-danger">{err}</div>}
            
            <form onSubmit={onSubmit}>
              {/* Dual Role Selector Dropdown Menu */}
              <div className="mb-3">
                <label className="form-label">Login As</label>
                <select 
                  className="form-select" 
                  value={form.role} 
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="member">Regular Member / Client</option>
                  <option value="admin">System Administrator (Nancy)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  required 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                />
              </div>

              <button className="btn btn-primary w-100">Login</button>
            </form>
            
            <p className="mt-3 mb-0 small">No account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
