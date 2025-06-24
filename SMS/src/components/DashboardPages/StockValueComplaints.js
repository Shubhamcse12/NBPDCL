// src/components/pages/StockValueComplaints.js
import React, { useEffect, useState } from 'react';
import './StockValueComplaints.css';

const StockValueComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder data; replace with backend API call later
    const fetchComplaints = async () => {
      try {
        const fakeData = [
          {
            id: 'CMP101',
            item: 'Copper Wire',
            reason: 'Incorrect stock valuation',
            reportedBy: 'Store Incharge',
            status: 'Pending',
            date: '2025-06-22',
          },
          {
            id: 'CMP102',
            item: 'Fuse Box',
            reason: 'Double entry found',
            reportedBy: 'Admin',
            status: 'Resolved',
            date: '2025-06-20',
          },
        ];
        // Simulate delay
        await new Promise((res) => setTimeout(res, 800));
        setComplaints(fakeData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load complaints', err);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="svc-container">
      <h2 className="svc-heading">📄 Stock Value Complaints</h2>

      {loading ? (
        <p className="svc-loading">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="svc-empty">No complaints found related to stock value.</p>
      ) : (
        <table className="svc-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Item</th>
              <th>Reason</th>
              <th>Reported By</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.item}</td>
                <td>{c.reason}</td>
                <td>{c.reportedBy}</td>
                <td>
                  <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
                </td>
                <td>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockValueComplaints;
