import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 fw-bold">Membership Management System</h1>
      <p className="lead text-muted">MERN Stack project — MongoDB, Express, React, Node.js</p>
      <div className="mt-4">
        <Link to="/register" className="btn btn-primary me-2">Get started</Link>
        <Link to="/plans" className="btn btn-outline-primary">Browse plans</Link>
      </div>
    </div>
  );
}
