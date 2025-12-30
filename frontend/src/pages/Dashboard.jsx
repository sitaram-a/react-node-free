import { useState } from "react";
import API from "../api/api";
import { jsxs } from "react/jsx-runtime";

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [user] = useState(storedUser);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
const [section, setSection] = useState("users");
const [skills, setSkills] = useState([]);
const [skillForm, setSkillForm] = useState({ name: "", level: "" });


// Portfolio Profile
const [profile, setProfile] = useState({
  name: "",
  title: "",
  bio: "",
  image: ""
});
const [profileMsg, setProfileMsg] = useState("");


  // 🔴 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 🔵 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch {
      setMessage("Failed to load users");
    }
  };

  // 🟢 ADD USER
  const addUser = async () => {
    try {
      await API.post("/api/users/add", form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
    } catch {
      setMessage("User creation failed");
    }
  };

  const startEdit = (user) => {
  setEditId(user._id);
  setEditForm({ name: user.name, email: user.email });
};

const saveEdit = async () => {
  try {
    await API.put(
      `/api/users/${editId}`,
      editForm,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
    setEditId(null);
  } catch {
    setMessage("Update failed");
  }
};

const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    await API.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers();
  } catch {
    setMessage("Delete failed");
  }
};

// 🔵 FETCH PROFILE
const fetchProfile = async () => {
  try {
    const res = await API.get("/api/profile");
    if (res.data) setProfile(res.data);
  } catch {
    setProfileMsg("Failed to load profile");
  }
};

// 🟢 SAVE PROFILE
const saveProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token); // 🔴 debug

    if (!token) {
      setProfileMsg("Token missing. Please login again.");
      return;
    }

    const res = await API.post(
      "/api/profile",
      profile,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("PROFILE RESPONSE:", res.data);
    setProfileMsg("Profile updated successfully ✅");
  } catch (err) {
    console.error("PROFILE ERROR:", err.response?.data);
    setProfileMsg(err.response?.data?.message || "Profile update failed ❌");
  }
};

const fetchSkills = async () => {
  const res = await API.get("/api/skills");
  setSkills(res.data);
};

const addSkill = async () => {
  await API.post("/api/skills", skillForm, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setSkillForm({ name: "", level: "" });
  fetchSkills();
};

const deleteSkill = async (id) => {
  await API.delete(`/api/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchSkills();
};



  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <h2>Admin Panel</h2>
        <div style={styles.headerRight}>
          <span>{user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>
        {/* SIDEBAR */}
       <aside style={styles.sidebar}>
  <h4>Menu</h4>

  <button
    style={styles.menuBtn}
    onClick={() => {
      setSection("users");
      fetchUsers();
    }}
  >
    User Management
  </button>

  <button
    style={styles.menuBtn}
    onClick={() => {
      setSection("profile");
      fetchProfile();
    }}
  >
    Profile Management
  </button>

  <button
  style={styles.menuBtn}
  onClick={() => {
    setSection("skills");
    fetchSkills();
  }}
>
  Skills Management
</button>

</aside>


        {/* MAIN CONTENT */}
        <main style={styles.main}>
          {section === "users" && (
  <>
    <h3>User Management</h3>

    {/* ADD USER */}
    <div style={styles.card}>
      <h4>Add User</h4>
      <input
 style={styles.inputfield}        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
 style={styles.inputfield}        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
 style={styles.inputfield}        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={addUser} style={styles.primaryBtn}>
        Add User
      </button>
    </div>

    {/* USER LIST */}
    <div style={styles.card}>
      <h4>User List</h4>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                {editId === u._id ? (
                  <input
 style={styles.inputfield}                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                ) : (
                  u.name
                )}
              </td>

              <td>
                {editId === u._id ? (
                  <input
 style={styles.inputfield}                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                ) : (
                  u.email
                )}
              </td>

              <td>
                {editId === u._id ? (
                  <>
                    <button onClick={saveEdit} style={styles.saveBtn}>
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      style={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(u)}
                      style={styles.editBtnSmall}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(u._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

{section === "profile" && (
  <>
    <h3>Portfolio Profile</h3>

    <div style={styles.card}>
      <input
 style={styles.inputfield}        placeholder="Name"
        value={profile.name}
        onChange={(e) =>
          setProfile({ ...profile, name: e.target.value })
        }
      />
      <input
 style={styles.inputfield}        placeholder="Title (e.g. Full Stack Developer)"
        value={profile.title}
        onChange={(e) =>
          setProfile({ ...profile, title: e.target.value })
        }
      />
      <input
 style={styles.inputfield}        placeholder="Profile Image URL"
        value={profile.image}
        onChange={(e) =>
          setProfile({ ...profile, image: e.target.value })
        }
      />
      <textarea style={styles.textareaas}
        placeholder="Short bio / About me"
        rows="4"
        value={profile.bio}
        onChange={(e) =>
          setProfile({ ...profile, bio: e.target.value })
        }
      />

      <button onClick={saveProfile} style={styles.primaryBtn}>
        Save Profile
      </button>

      {profileMsg && <p>{profileMsg}</p>}
    </div>
  </>
)}


       {section === "skills" && (
  <>
    <h3>Skills</h3>

    <div style={styles.card}>
      <input
 style={styles.inputfield}        placeholder="Skill name"
        value={skillForm.name}
        onChange={(e) =>
          setSkillForm({ ...skillForm, name: e.target.value })
        }
      />
      <input
 style={styles.inputfield}        placeholder="Level (0-100)"
        type="number"
        value={skillForm.level}
        onChange={(e) =>
          setSkillForm({ ...skillForm, level: e.target.value })
        }
      />
      <button onClick={addSkill} style={styles.primaryBtn}>
        Add Skill
      </button>
    </div>

    <div style={styles.card}>
      {skills.map((s) => (
        <div key={s._id} style={{ marginBottom: "10px" }}>
          <strong>{s.name}</strong> – {s.level}%
          <button
            onClick={() => deleteSkill(s._id)}
            style={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </>
)}


        </main>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f172a",
    color: "#fff"
  },
  header: {
    height: "60px",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#020617",
    borderBottom: "1px solid #1e293b"
  },
  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer"
  },
  body: {
    flex: 1,
    display: "flex"
  },
  sidebar: {
    width: "220px",
    padding: "20px",
    background: "#020617",
    borderRight: "1px solid #1e293b"
  },
  menuBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: "#4f46e5",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    margin:"5px 0"
  },
  main: {
    flex: 1,
    padding: "24px"
  },
  card: {
    background: "#020617",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    display:"flex",
    alignItems:"center"
  },
  primaryBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "10%",
    borderRadius: "8px",
    background: "#22c55e",
    border: "none",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  footer: {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    borderTop: "1px solid #1e293b",
    fontSize: "13px"
  },
  editBtnSmall: {
  padding: "6px 10px",
  marginRight: "6px",
  background: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
},
deleteBtn: {
  padding: "6px 10px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
},
saveBtn: {
  padding: "6px 10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  marginRight: "6px",
  cursor: "pointer"
},
cancelBtn: {
  padding: "6px 10px",
  background: "#64748b",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
},
inputfield:{
    height: "30px",
    borderRadius: "6px",
    padding: "5px",
    marginRight: "5px"
},
textareaas:{
    marginRight:"10px",
    padding:"5px",
    width:"30%",
    borderRadius:"5px"
}
};
