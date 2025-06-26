import React, { useState } from 'react';
import axios from 'axios';
import './Complaint.css';

function Complaint() {
  const [mode, setMode] = useState('file'); // file or track
  const [userType, setUserType] = useState('public');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    centerId: '',
    type: '',
    subject: '',
    description: '',
  });

  const [trackInput, setTrackInput] = useState('');
  const [complaints, setComplaints] = useState([]);

  const complaintTypes = {
    public: ['Power Outage', 'High Bill', 'Pole Issue', 'Transformer Issue'],
    center: ['Damaged Equipment', 'Stock Shortage', 'Delay in Supply', 'Meter Fault']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/complaints', formData, {
        withCredentials: true
      });
      alert('Complaint submitted successfully!');
      setFormData({
        name: '',
        email: '',
        centerId: '',
        type: '',
        subject: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit complaint.');
    }
  };

  const handleTrack = async () => {
    if (!trackInput) return alert("Please enter Email or Center ID");

    try {
      const res = await axios.get('http://localhost:5000/api/complaints', {
        params: { userType, identifier: trackInput },
        withCredentials: true
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch complaints");
    }
  };

  return (
    <div className="complaint-form-container">
      <div className="mode-toggle">
        <button onClick={() => setMode('file')} className={mode === 'file' ? 'active' : ''}>File Complaint</button>
        <button onClick={() => setMode('track')} className={mode === 'track' ? 'active' : ''}>Track Complaints</button>
      </div>

      {mode === 'file' ? (
        <form className="complaint-form" onSubmit={handleSubmit}>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="public">Public User</option>
            <option value="center">Local Center</option>
          </select>

          {userType === 'public' ? (
            <>
              <input type="text" placeholder="Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </>
          ) : (
            <input type="text" placeholder="Center ID" value={formData.centerId}
              onChange={(e) => setFormData({ ...formData, centerId: e.target.value })} required />
          )}

          <select value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
            <option value="">Select Complaint Type</option>
            {complaintTypes[userType].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input type="text" placeholder="Subject" value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />

          <textarea placeholder="Description" rows={4} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

          <button type="submit">Submit Complaint</button>
        </form>
      ) : (
        <div className="track-section">
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="public">Public User</option>
            <option value="center">Local Center</option>
          </select>

          <input
            type="text"
            placeholder={userType === 'public' ? 'Enter your Email' : 'Enter Center ID'}
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
          />
          <button onClick={handleTrack}>Fetch Complaints</button>

          <div className="complaints-list">
            {complaints.length === 0 ? (
              <p>No complaints found.</p>
            ) : (
              complaints.map((comp, i) => (
                <div key={i} className="complaint-card">
                  <h4>{comp.subject}</h4>
                  <p><strong>Type:</strong> {comp.type}</p>
                  <p><strong>Status:</strong> {comp.status || 'Pending'}</p>
                  <p>{comp.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;
