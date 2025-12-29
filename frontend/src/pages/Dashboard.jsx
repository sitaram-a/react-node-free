import { useState } from "react";
import API from "../api/api";

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        "/api/users/profile",
        { name: user.name, email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEdit(false);
      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage("Update failed ❌");
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2>MyApp</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h3>Profile</h3>

          <div style={styles.field}>
            <label>Name</label>
            <input
              disabled={!edit}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              disabled={!edit}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {edit ? (
            <button onClick={handleUpdate} style={styles.saveBtn}>
              Save Changes
            </button>
          ) : (
            <button onClick={() => setEdit(true)} style={styles.editBtn}>
              Edit Profile
            </button>
          )}

          {message && <p style={styles.message}>{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "#fff"
  },
  header: {
    height: "64px",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1e293b"
  },
  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#020617",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px"
  },
  editBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    background: "#4f46e5",
    border: "none",
    color: "#fff",
    cursor: "pointer"
  },
  saveBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    background: "#22c55e",
    border: "none",
    color: "#000",
    cursor: "pointer"
  },
  message: {
    marginTop: "16px",
    textAlign: "center",
    color: "#22c55e"
  }
};
