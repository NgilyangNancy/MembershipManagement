import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => { api.get("/plans").then((r) => setPlans(r.data)); }, []);

  const subscribe = async (planId) => {
    if (!user) return nav("/login");
    await api.post("/memberships", { planId });
    alert("Subscription requested — pending admin approval.");
    nav("/dashboard");
  };

  return (
    <div>
      <h2 className="mb-4">Plans</h2>
      <div className="row g-3">
        {plans.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card h-100 shadow-sm"><div className="card-body d-flex flex-column">
              <h4>{p.name}</h4>
              <p className="text-muted">{p.description}</p>
              <h3 className="mb-2">₹{p.price}<small className="text-muted fs-6"> / {p.durationDays}d</small></h3>
              <ul className="small flex-grow-1">{p.features?.map((f, i) => <li key={i}>{f}</li>)}</ul>
              <button className="btn btn-primary mt-2" onClick={() => subscribe(p._id)}>Subscribe</button>
            </div></div>
          </div>
        ))}
        {plans.length === 0 && <p className="text-muted">No plans yet.</p>}
      </div>
    </div>
  );
}
