import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const handleCreateOrUpdate = (user) => {
    if (editingUser) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then((response) => {
          const updatedUsers = users.map((u) =>
            u.id === user.id ? response.data : u
          );
          setUsers(updatedUsers);
        });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => setUsers([...users, response.data]));
    }
    setEditingUser(null);
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => setUsers(users.filter((user) => user.id !== id)));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <button className="add-user-btn" onClick={() => setOpen(true)}>
        Add New User
      </button>
      {open && (
        <UserForm
          onSave={handleCreateOrUpdate}
          user={editingUser}
          onClose={() => setOpen(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <Link to={`/user/${user.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
