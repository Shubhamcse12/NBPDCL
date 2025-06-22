// src/components/UserSignup.jsx
import React from 'react';
import './UserSignup.css';

function UserSignup() {
  return (
    <section className="signup-section">
      <h2>USER SIGNUP</h2>
      <div className="signup-box">
        <div className="boxes-header">SINGUP FORM</div>
        <form>
          <label>Enter Full Name</label>
          <input type="text" placeholder="Full Name" required />

          <label>Mobile Number :</label>
          <input type="text" placeholder="Mobile Number" required />

          <label>Enter Email</label>
          <input type="email" placeholder="Email" required />

          <label>Enter Password</label>
          <input type="password" placeholder="Password" required />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" required />

          <label>Verification code :</label>
          <div className="captcha-row">
            <input type="text" placeholder="Enter code" required />
            <img src="captcha.jpg" alt="captcha" />
          </div>

          <button type="submit" className="register-btn">Register Now</button>
        </form>
      </div>
    </section>
  );
}

export default UserSignup;
