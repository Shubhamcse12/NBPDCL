// src/components/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../DashboardCard';
import './Dashboard.css';

const Dashboard = ({ userType }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <DashboardCard title="Total Products" description="1,250 items in stock" icon="📦" onClick={() => navigate('/inventory')} />
        <DashboardCard title="Low Stock Alerts" description="23 items need restocking" icon="⚠️" onClick={() => navigate('/low-stock')} />
        <DashboardCard title="Stock Value" description="₹12.3 Lakhs" icon="💰" onClick={() => navigate('/stock-value')} />
        <DashboardCard title="New Complaints" description="5 unresolved" icon="📨" onClick={() => navigate('/complaints')} />
      </div>

      {/* Charts */}
      {(userType === 'admin' || userType === 'user') && (
        <div className="dashboard-grid">
          <DashboardCard
            title="Stock by Category"
            description="📊 Bar Chart will render here (e.g., Electronics, Stationery)"
            icon="📊"
            onClick={() => navigate('/charts/category')}
          />
          <DashboardCard
            title="Stock Status Breakdown"
            description="🥧 Pie Chart will render here (Available, Low, Out of Stock)"
            icon="🥧"
            onClick={() => navigate('/charts/status')}
          />
        </div>
      )}

      {/* Role Panels */}
      <div className="dashboard-grid">
        <DashboardCard title="Welcome" description={`Logged in as: ${userType}`} icon="👤" />

        {userType === 'admin' && (
          <>
            <DashboardCard title="Manage Users" description="Create, update, or delete users" icon="🛠️" onClick={() => navigate('/admin/users')} />
            <DashboardCard title="Recent Stock Activity" description="Latest logs of issued/received items" icon="🕒" onClick={() => navigate('/admin-activity')} />
          </>
        )}

        {userType === 'user' && (
          <>
            <DashboardCard title="My Orders" description="Track your orders and requests" icon="📦" onClick={() => navigate('/user-orders')} />
            <DashboardCard title="Support" description="Raise a complaint or contact support" icon="☎️" onClick={() => navigate('/support')} />
          </>
        )}

        {userType === 'guest' && (
          <DashboardCard
            title="Guest Access"
            description="Please login or sign up to access full features"
            icon="🔒"
            onClick={() => navigate('/user-login')}
          />
        )}
      </div>

      {/* Quick Actions */}
      {(userType === 'admin') && (
        <div className="dashboard-grid">
          <DashboardCard title="Add New Stock" description="➕ Add stock items" icon="➕" onClick={() => navigate('/stock/add')} />
          <DashboardCard title="Issue Item" description="📤 Mark stock as issued" icon="📤" onClick={() => navigate('/issue-stock')} />
          <DashboardCard title="Receive Item" description="📥 Log received stock" icon="📥" onClick={() => navigate('/receive-stock')} />
          <DashboardCard title="View Complaints" description="📄 Check all complaints" icon="📄" onClick={() => navigate('/complaints')} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
