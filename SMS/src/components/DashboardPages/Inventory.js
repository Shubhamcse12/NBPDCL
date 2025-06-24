// src/components/pages/Inventory.js
import React, { useState } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Example placeholder data
  const items = [
    { id: 1, name: 'Electric Meter', category: 'Electronics', stock: 120, status: 'Available' },
    { id: 2, name: 'Wire Coil', category: 'Hardware', stock: 10, status: 'Low Stock' },
    { id: 3, name: 'Transformer Oil', category: 'Consumables', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Switchgear', category: 'Electrical', stock: 55, status: 'Available' },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h2 className="inventory-heading">Inventory Management</h2>

      <div className="inventory-toolbar">
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inventory-search"
        />
        <button className="inventory-add-button">➕ Add New Item</button>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td className={`status ${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {item.status}
                  </td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
