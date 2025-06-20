import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend login logic placeholder
    console.log({ email, password, code });
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="top-header">
        
        <nav className="nav">
          <a href="#">ADMIN LOGIN</a>
          <a href="#">USER SIGNUP</a>
          <a href="#">USER LOGIN</a>
        </nav>
      </header>

      {/* Page Divider */}
      <div className="divider"></div>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="form-title">USER LOGIN FORM</h2>
        <div className="login-card">
          <div className="card-header">LOGIN FORM</div>
          <form onSubmit={handleSubmit} className="form-body">
            <label>Enter Email id</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="forgot">
              <a href="#">Forgot Password</a>
            </div>

            <label>Verification code :</label>
            <div className="captcha">
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <img
                src="https://via.placeholder.com/90x30.png?text=Captcha"
                alt="captcha"
              />
            </div>

            <div className="form-actions">
              <button type="submit">LOGIN</button>
              <span>| <a href="#">Not Register Yet</a></span>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2019 Online Library Management System | Designed by : Kumar Pandule
      </footer>
    </div>
  );
};

export default LoginPage;
