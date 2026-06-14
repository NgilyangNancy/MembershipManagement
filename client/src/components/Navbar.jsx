import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Membership</Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            {user && <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>}
            <li className="nav-item"><NavLink className="nav-link" to="/plans">Plans</NavLink></li>
            {user && <li className="nav-item"><NavLink className="nav-link" to="/events">Events</NavLink></li>}
            {user && <li className="nav-item"><NavLink className="nav-link" to="/announcements">Announcements</NavLink></li>}
            {user && <li className="nav-item"><NavLink className="nav-link" to="/members">Members</NavLink></li>}
            {isAdmin && <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>}
          </ul>
          <ul className="navbar-nav">
            {!user && <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>}
            {!user && <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>}
            {user && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/profile">{user.fullName}</NavLink></li>
                <li className="nav-item"><button className="btn btn-outline-light btn-sm ms-2" onClick={() => { logout(); nav("/login"); }}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
