// src/components/pages/StockValue.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './StockValue.css';

const StockValue = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stocks");
        setStockData(res.data);

        const total = res.data.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        setTotalValue(total);
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const categories = [...new Set(stockData.map((item) => item.category))];

  const filteredData = stockData
    .filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (selectedCategory ? item.category === selectedCategory : true));

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Value Report", 14, 15);

    const tableColumn = ["S.No.", "Item Id", "Item", "Category", "Qty", "Unit Price (₹)", "Total Value (₹)"];
    const tableRows = filteredData.map((item, index) => [
      index + 1,
      item._id.slice(0, 9),
      item.itemName,
      item.category,
      item.quantity,
      item.unitPrice,
      (item.quantity * item.unitPrice).toFixed(2),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "striped",
    });

    doc.save("stock-value-report.pdf");
  };

  return (
    <div className="stock-value-container">
      <h2 className="stock-value-heading">💰 Stock Value Overview</h2>

      <div className="stock-toolbar">
        <input
          className="stock-search"
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="stock-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="stock-select"
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>{num} per page</option>
          ))}
        </select>

        <button className="download-btn" onClick={handleDownloadPDF}>📄 Download</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading stock value...</p>
      ) : (
        <>
          <div className="total-value-box">
            <strong>Total Stock Value:</strong> ₹{totalValue.toLocaleString()}
          </div>

          <div className="stock-table-container">
            <table className="stock-value-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Item Id</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit Price (₹)</th>
                  <th>Total Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={item._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{item._id.slice(0, 9)}...</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>₹{(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              ⬅️ Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StockValue;
