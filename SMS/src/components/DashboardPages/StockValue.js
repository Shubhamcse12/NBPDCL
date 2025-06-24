// src/components/pages/StockValue.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockValue.css';

const StockValue = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stocks");
        setStockData(res.data);

        const total = res.data.reduce((sum, item) => {
          return sum + item.quantity * item.unitPrice;
        }, 0);

        setTotalValue(total);
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="stock-value-container">
      <h2 className="stock-value-heading">💰 Stock Value Overview</h2>

      {loading ? (
        <p className="loading-text">Loading stock value...</p>
      ) : (
        <>
          <div className="total-value-box">
            <strong>Total Stock Value:</strong> ₹{totalValue.toLocaleString()}
          </div>

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
              {stockData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
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
        </>
      )}
    </div>
  );
};

export default StockValue;
