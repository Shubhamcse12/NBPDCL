// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import AdminLogin from './components/pages/AdminLogin';
import UserSignup from './components/pages/UserSignup';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/user-signup" element={<UserSignup />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
