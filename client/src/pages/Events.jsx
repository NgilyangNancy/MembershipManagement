import { useEffect, useState } from "react";
import api from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const load = () => api.get("/events").then((r) => setEvents(r.data));
  useEffect(() => { load(); }, []);

  const rsvp = async (id) => { await api.post(`/events/${id}/rsvp`); load(); };

  return (
    <div>
      <h2 className="mb-3">Events</h2>
      <div className="row g-3">
        {events.map((e) => (
          <div className="col-md-6" key={e._id}>
            <div className="card"><div className="card-body">
              <h5>{e.title}</h5>
              <p className="text-muted small mb-1">{new Date(e.startsAt).toLocaleString()} · {e.location}</p>
              <p>{e.description}</p>
              <button className="btn btn-outline-primary btn-sm" onClick={() => rsvp(e._id)}>RSVP ({e.attendees?.length || 0})</button>
            </div></div>
          </div>
        ))}
        {events.length === 0 && <p className="text-muted">No events.</p>}
      </div>
    </div>
  );
}
