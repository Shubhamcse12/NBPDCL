
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUsersPage.css";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/status`, { status: newStatus });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, status: newStatus } : user))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
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
              <th>Status</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn accept" onClick={() => handleStatusChange(user._id, "accepted")}>Accept</button>
                    <button className="btn hold" onClick={() => handleStatusChange(user._id, "held")}>Hold</button>
                    <button className="btn block" onClick={() => handleStatusChange(user._id, "blocked")}>Block</button>
                    <button className="btn delete" onClick={() => handleDelete(user._id)}>Delete</button>
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
