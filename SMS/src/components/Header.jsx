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
      {/* Top Layer: Logos */}
      <div className="header-top">
        <div className="header-left">
          <img src="logo.png" alt="Company Logo" className="logo" />
          <h1 className="header-title">
            <span>Stock</span><span> Management </span><span>System</span>
          </h1>
        </div>
        <div className="header-right">
          <img src="NBPDCL.png" alt="Partner Logo" className="logo" />
        </div>
      </div>

      {/* Bottom Layer: Navigation */}
      <div className="header-bottom">
        <div className="left-section">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <div className="logged-in-label">
            {userType !== "" && (
              <span>
                Logged in as: <strong>{userType}</strong>
              </span>
            )}
          </div> </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {userType === 'guest' && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/admin-login" onClick={() => setMenuOpen(false)}>Admin Login</Link>
              <Link to="/user-signup" onClick={() => setMenuOpen(false)}>User Signup</Link>
              <Link to="/user-login" onClick={() => setMenuOpen(false)}>User Login</Link>
              <Link to="/file-complaint" onClick={() => setMenuOpen(false)}>File Complaint</Link>
            </>
          )}

          {userType === 'admin' && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/admin-inventory" onClick={() => setMenuOpen(false)}>Inventory</Link>
              <Link to="/admin-orders" onClick={() => setMenuOpen(false)}>Orders</Link>
              <Link to="/admin-logout" className="logout" onClick={handleLogout}>Logout</Link>
            </>
          )}

          {userType === 'user' && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/user-stock" onClick={() => setMenuOpen(false)}>Inventory</Link>
              <Link to="/user-orders"  onClick={() => setMenuOpen(false)}>Orders</Link>
              <Link to="/user-logout" className="logout" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
