// src/components/pages/StockValue.js
import React, { useEffect, useState } from 'react';
import './StockValue.css';

const StockValue = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Replace with actual backend call later
    const fetchStockValue = async () => {
      try {
        // Simulate API call
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: [
                  { id: 1, name: 'Wire Coil', category: 'Hardware', quantity: 80, price: 250 },
                  { id: 2, name: 'Insulators', category: 'Consumables', quantity: 100, price: 40 },
                  { id: 3, name: 'Fuse', category: 'Electronics', quantity: 200, price: 35 },
                ],
              }),
            1000
          )
        );
        const data = response.data;
        setStockData(data);
        setTotalValue(data.reduce((sum, item) => sum + item.quantity * item.price, 0));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockValue();
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
                <th>ID</th>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>₹{item.quantity * item.price}</td>
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
