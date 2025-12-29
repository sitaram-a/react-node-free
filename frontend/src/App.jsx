import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
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
      )}
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
