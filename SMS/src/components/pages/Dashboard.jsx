// src/components/pages/Dashboard.js
import React from 'react';
import DashboardCard from '../DashboardCard';
import './Dashboard.css'; // Make sure this file is created

const Dashboard = ({ userType }) => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <DashboardCard title="Total Products" description="1,250 items in stock" icon="📦" />
        <DashboardCard title="Low Stock Alerts" description="23 items need restocking" icon="⚠️" />
        <DashboardCard title="Stock Value" description="₹12.3 Lakhs" icon="💰" />
        <DashboardCard title="New Complaints" description="5 unresolved" icon="📨" />
      </div>

      {/* Charts */}
      {(userType === 'admin' || userType === 'user') && (
        <div className="dashboard-grid">
          <DashboardCard
            title="Stock by Category"
            description="📊 Bar Chart will render here (e.g., Electronics, Stationery)"
            icon="📊"
          />
          <DashboardCard
            title="Stock Status Breakdown"
            description="🥧 Pie Chart will render here (Available, Low, Out of Stock)"
            icon="🥧"
          />
        </div>
      )}

      {/* Role Panels */}
      <div className="dashboard-grid">
        <DashboardCard title="Welcome" description={`Logged in as: ${userType}`} icon="👤" />

        {userType === 'admin' && (
          <>
            <DashboardCard title="Manage Users" description="Create, update, or delete users" icon="🛠️" />
            <DashboardCard title="Recent Stock Activity" description="Latest logs of issued/received items" icon="🕒" />
          </>
        )}

        {userType === 'user' && (
          <>
            <DashboardCard title="My Orders" description="Track your orders and requests" icon="📦" />
            <DashboardCard title="Support" description="Raise a complaint or contact support" icon="☎️" />
          </>
        )}

        {userType === 'guest' && (
          <DashboardCard
            title="Guest Access"
            description="Please login or sign up to access full features"
            icon="🔒"
          />
        )}
      </div>

      {/* Quick Actions */}
      {(userType === 'admin' || userType === 'user') && (
        <div className="dashboard-grid">
          <DashboardCard title="Add New Stock" description="➕ Add stock items" icon="➕" />
          <DashboardCard title="Issue Item" description="📤 Mark stock as issued" icon="📤" />
          <DashboardCard title="Receive Item" description="📥 Log received stock" icon="📥" />
          <DashboardCard title="View Complaints" description="📄 Check all complaints" icon="📄" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
