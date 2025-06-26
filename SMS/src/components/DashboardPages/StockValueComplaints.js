// src/components/pages/StockValueComplaints.js
import React, { useEffect, useState } from 'react';
import './StockValueComplaints.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StockValueComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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

  const filteredComplaints = complaints
    .filter((c) =>
      c.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.reason.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => (selectedStatus ? c.status === selectedStatus : true));

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredComplaints.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredComplaints.length / recordsPerPage);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Stock Value Complaints', 14, 15);
    autoTable(doc, {
      head: [['Complaint ID', 'Item', 'Reason', 'Reported By', 'Status', 'Date']],
      body: filteredComplaints.map((c) => [
        c.id,
        c.item,
        c.reason,
        c.reportedBy,
        c.status,
        c.date,
      ]),
      startY: 20,
    });
    doc.save('stock-value-complaints.pdf');
  };

  return (
    <div className="svc-container">
      <h2 className="svc-heading">📄 Stock Value Complaints</h2>

      <div className="svc-toolbar">
        <input
          type="text"
          className="svc-search"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="svc-select"
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          className="svc-select"
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20].map((num) => (
            <option key={num} value={num}>
              {num} per page
            </option>
          ))}
        </select>

        <button className="download-btn" onClick={handleDownloadPDF}>
          📄 Download PDF
        </button>
      </div>

      {loading ? (
        <p className="svc-loading">Loading complaints...</p>
      ) : currentRecords.length === 0 ? (
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
            {currentRecords.map((c) => (
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

      {filteredComplaints.length > recordsPerPage && (
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅️ Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default StockValueComplaints;
