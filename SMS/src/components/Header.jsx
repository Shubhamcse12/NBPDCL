import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ userType }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-wrapper">
      {/* Top Layer: Logos */}
   <div className="header-top">
  <div className="header-left">
    <img src="logo.png" alt="Company Logo" className="logo" />
    <h1 className="header-title"><span>Stock</span><span>  Management </span><span>System</span></h1>
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

        <nav className={`nav-links ${menuOpen ? 'open' : 'close'}`}>
          {userType === 'guest' && (
            <>
              <Link to="/admin-login">Admin Login</Link>
              <Link to="/user-signup">User Signup</Link>
              <Link to="/user-login">User Login</Link>
              <a href="/track-order">File Complaint</a>
            </>
          )}

          {userType === 'admin' && (
            <>
              <Link to="/admin-dashboard">Dashboard</Link>
              <Link to="/admin-inventory">Inventory</Link>
              <Link to="/admin-orders">Orders</Link>
              <Link to="/admin-logout">Logout</Link>
            </>
          )}

          {userType === 'user' && (
            <>
              <Link to="/user-dashboard">Dashboard</Link>
              <Link to="/user-stock">Inventory</Link>
              <Link to="/user-orders">Orders</Link>
              <Link to="/user-logout">Logout</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
