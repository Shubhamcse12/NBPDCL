// src/components/LoginForm.jsx
import React from 'react';
import './LoginForm.css';

function LoginForm() {
  return (
    <div className="login-section">
      <h2>USER LOGIN FORM</h2>
      <div className="login-box">
        <div className="box-header">LOGIN FORM</div>
        <form>
          <label htmlFor="email">Enter Email id</label>
          <input type="email" id="email" placeholder="Email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />

          <div className="forgot-link">
            <a href="#">Forgot Password</a>
          </div>

          <label >Verification code :</label>
          <div className="captcha-row">
            
            <input type="text" id="code" />
            <img src="https://via.placeholder.com/50x30?text=CAP" alt="captcha" />
          </div>

          <div className="form-buttons">
            <button type="submit">LOGIN</button>
            <span>|</span>
            <a href="#">Not Register Yet</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
