import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(token ? "dashboard" : "login");

  useEffect(() => {
    if (token) setPage("dashboard");
  }, [token]);

  if (page === "dashboard") return <Dashboard />;

  return page === "login" ? (
    <>
      <Login />
      <p style={linkStyle} onClick={() => setPage("register")}>
        Don’t have an account? Register
      </p>
    </>
  ) : (
    <>
      <Register />
      <p style={linkStyle} onClick={() => setPage("login")}>
        Already have an account? Login
      </p>
    </>
  );
}

export default App;

const linkStyle = {
  textAlign: "center",
  marginTop: "-40px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500"
};
