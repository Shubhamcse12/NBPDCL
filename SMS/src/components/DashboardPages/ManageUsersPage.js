// src/components/pages/ManageUsersPage.js
import React, { useEffect, useState } from "react";
import "./ManageUsersPage.css";

const dummyUsers = [
  { id: 1, name: "Amit Kumar", email: "amit@nbpdcl.in", role: "admin" },
  { id: 2, name: "Rohit Singh", email: "rohit@nbpdcl.in", role: "user" },
  { id: 3, name: "Priya Das", email: "priya@nbpdcl.in", role: "user" },
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Fetch users from backend later
    setUsers(dummyUsers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="manage-users-container">
      <h2 className="manage-users-title">👥 Manage Users</h2>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="actions-cell">
                    <button className="btn view">View</button>
                    <button className="btn edit">Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;
