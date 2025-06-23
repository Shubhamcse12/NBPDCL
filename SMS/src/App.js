// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import LoginForm from './components/LoginForm';
import AdminLogin from './components/pages/AdminLogin';
import UserSignup from './components/pages/UserSignup';
import Dashboard from './components/pages/Dashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import UserDashboard from './components/pages/UserDashboard';

function App() {
  const [userType, setUserType] = useState('guest'); 

  return (
    <div className="app-wrapper">
      <Router>
        <Header userType={userType} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-login" element={<LoginForm setUserType={setUserType} />} />
            <Route path="/admin-login" element={<AdminLogin setUserType={setUserType} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-signup" element={<UserSignup />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
