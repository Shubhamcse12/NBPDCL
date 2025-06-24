// src/components/pages/LowStock.js
import React, { useEffect, useState } from 'react';
import './LowStock.css';

const LowStock = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with real API endpoint later
    const fetchLowStockItems = async () => {
      try {
        // Simulate API call
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: [
                  { id: 1, name: 'Wire Coil', category: 'Hardware', stock: 8 },
                  { id: 2, name: 'Insulators', category: 'Consumables', stock: 5 },
                  { id: 3, name: 'Fuse', category: 'Electronics', stock: 3 },
                ],
              }),
            1000
          )
        );
        setLowStockItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data', err);
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
              <th>ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="low-value">{item.stock}</td>
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
