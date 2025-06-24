import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ userType, setUserType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUserType("guest");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed");
    }
  };

  return (
    <header className="header-wrapper">
      <div className="header-top">
        <div className="header-left">
          <img src="logo.png" alt="Company Logo" className="logo" />
          <h1 className="header-title">
            <span>Stock</span>
            <span> Management </span>
            <span>System</span>
          </h1>
        </div>
        <div className="header-right">
          <img src="NBPDCL.png" alt="Partner Logo" className="logo" />
        </div>
      </div>

      {/* Bottom Layer: Navigation */}
      <div className="header-bottom">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className="logged-in-label">
          {userType !== "guest" && (
            <span>
              Logged in as: <strong>{userType}</strong>
            </span>
          )}
        </div>

      
        <div className="nav-wrapper">
          <nav className={`nav-links ${menuOpen ? "open" : "close"}`}>
            {userType === "guest" && (
              <>
                <Link to="/">Home</Link>
                <Link to="/admin-login">Admin Login</Link>
                <Link to="/user-signup">User Signup</Link>
                <Link to="/user-login">User Login</Link>
                <a href="/track-order">File Complaint</a>
              </>
            )}

            {userType === "admin" && (
              <>
                <Link to="/">Dashboard</Link>
                <Link to="/admin-inventory">Inventory</Link>
                <Link to="/admin-orders">Orders</Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            )}

            {userType === "user" && (
              <>
                <Link to="/">Dashboard</Link>
                <Link to="/user-stock">Inventory</Link>
                <Link to="/user-orders">Orders</Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
