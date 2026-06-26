import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("peecAdminLoggedIn");
    navigate("/admin");
  };

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <h1>PEEC Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Announcements</h2>
          <p>Add or update church announcements.</p>
          <button onClick={() => navigate("/admin/announcements")}>
            Manage Announcements
          </button>
        </div>

        <div className="admin-card">
          <h2>Events</h2>
          <p>Add upcoming church events and programs.</p>
          <button onClick={() => navigate("/admin/events")}>
            Manage Events
          </button>
        </div>

        <div className="admin-card">
          <h2>Pictures</h2>
          <p>Update homepage, about page, pastor, elders, and event pictures.</p>
          <button onClick={() => navigate("/admin/pictures")}>
            Manage Pictures
          </button>
        </div>

        <div className="admin-card">
          <h2>Giving</h2>
          <p>Update giving information.</p>
          <button onClick={() => navigate("/admin/giving")}>
            Manage Giving
          </button>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;