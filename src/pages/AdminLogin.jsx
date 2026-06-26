import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin";
    if (password === adminPassword) {
      localStorage.setItem("peecAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h1>PEEC Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default AdminLogin;