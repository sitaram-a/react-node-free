// import { LogOut } from "lucide-react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <header style={styles.header}>
        <h2 style={styles.logo}>MyApp</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main style={styles.container}>
        <div style={styles.card}>
          <h3 style={styles.welcome}>Welcome back 👋</h3>

          <div style={styles.profile}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p style={styles.name}>{user?.name}</p>
              <p style={styles.email}>{user?.email}</p>
            </div>
          </div>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <p>Total Logins</p>
              <h4>12</h4>
            </div>
            <div style={styles.statBox}>
              <p>Account Status</p>
              <h4 style={{ color: "#22c55e" }}>Active</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #020617)",
    color: "#fff"
  },
  header: {
    height: "64px",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#020617",
    borderBottom: "1px solid #1e293b"
  },
  logo: {
    margin: 0,
    fontSize: "20px"
  },
  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#020617",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
  },
  welcome: {
    marginBottom: "24px"
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px"
  },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700"
  },
  name: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600"
  },
  email: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8"
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px"
  },
  statBox: {
    background: "#020617",
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #1e293b"
  }
};
