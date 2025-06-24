// src/components/pages/LowStock.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LowStock.css';

const LowStock = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stocks');
        const lowItems = res.data.filter((item) => item.quantity < 25);
        setLowStockItems(lowItems);
      } catch (err) {
        console.error('Failed to fetch low stock items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockItems();
  }, []);

  return (
    <div className="low-stock-container">
      <h2 className="low-stock-heading">⚠️ Low Stock Items</h2>

      {loading ? (
        <p className="loading-text">Loading low stock data...</p>
      ) : lowStockItems.length > 0 ? (
        <table className="low-stock-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id.slice(0, 9)}...</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td className="low-value">{item.quantity}</td>
                <td>
                  <button className="restock-btn">Request Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-items">🎉 No items are currently low in stock.</p>
      )}
    </div>
  );
};

export default LowStock;
