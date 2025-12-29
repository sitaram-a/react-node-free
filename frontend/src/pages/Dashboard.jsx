function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <p>Welcome, <b>{user?.name}</b></p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff"
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px"
  }
};
