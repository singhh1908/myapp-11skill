import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from backend
  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then(() => {
      fetchUsers();
      setName("");
      setEmail("");
    });
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    }).then(() => fetchUsers());
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Full Stack User App</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add</button>

      {users.map((u) => (
        <div key={u.id}>
          <h3>{u.name}</h3>
          <p>{u.email}</p>
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
