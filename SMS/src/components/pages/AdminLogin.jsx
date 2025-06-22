// src/components/AdminLogin.jsx
import React from 'react';
import './AdminLogin.css';

function AdminLogin() {
  return (
    <section className="admin-login-section">
      <h2>ADMIN LOGIN FORM</h2>
      <div className="admin-login-box">
        <div className="box-header">LOGIN FORM</div>
        <form>
          <label>Enter Username</label>
          <input type="text" placeholder="Username" required />

          <label>Password</label>
          <input type="password" placeholder="Password" required />

          <label>Verification code :</label>
          <div className="captcha-row">
            <input type="text" placeholder="Enter code" required />
            <img src="captcha.jpg" alt="captcha" />
          </div>

          <button type="submit" className="login-btn">LOGIN</button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
