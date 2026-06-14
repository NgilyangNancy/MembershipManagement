import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Plans from "./pages/Plans.jsx";
import Events from "./pages/Events.jsx";
import Announcements from "./pages/Announcements.jsx";
import Members from "./pages/Members.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminPlans from "./pages/AdminPlans.jsx";
import AdminMemberships from "./pages/AdminMemberships.jsx";
import AdminPayments from "./pages/AdminPayments.jsx";
import AdminEvents from "./pages/AdminEvents.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<Plans />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/plans" element={<ProtectedRoute adminOnly><AdminPlans /></ProtectedRoute>} />
          <Route path="/admin/memberships" element={<ProtectedRoute adminOnly><AdminMemberships /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute adminOnly><AdminPayments /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute adminOnly><AdminEvents /></ProtectedRoute>} />

          <Route path="*" element={<div className="py-5 text-center"><h3>404</h3></div>} />
        </Routes>
      </div>
    </>
  );
}
