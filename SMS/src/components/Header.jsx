// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-row">
        <div className="header-left">
          <img
            src="SMS_logo.jpg"
            alt="LNJPIT Logo"
            className="logo"
          />
          <div className="title-text">
            <strong>
             Stock Management System
            </strong>
          </div>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/admin-login">ADMIN LOGIN</Link>
          <Link to="/user-signup">USER SIGNUP</Link>
          <Link to="/">USER LOGIN</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
