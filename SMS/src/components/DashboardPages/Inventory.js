// src/components/pages/Inventory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((item) => item.category))];

  const filteredProducts = products
    .filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 14, 15);

    const tableColumn = [
      "ID",
      "Item Name",
      "Category",
      "Quantity",
      "Unit Price (₹)",
      "Supplier",
      "Location",
      "Description",
    ];

    const tableRows = filteredProducts.map((item) => [
      item._id.slice(0, 6),
      item.itemName,
      item.category,
      item.quantity,
      `₹${item.unitPrice.toFixed(2)}`,
      item.supplier,
      item.location,
      item.description || "-",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "striped",
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save("inventory-report.pdf");
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-heading">📦 Inventory</h2>

      <div className="inventory-toolbar">
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inventory-search"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="inventory-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button className="download-btn" onClick={handleDownloadPDF}>
          📄 Download PDF
        </button>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Supplier</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item._id}>
                  <td>{item._id.slice(0, 6)}...</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice.toFixed(2)}</td>
                  <td>{item.supplier}</td>
                  <td>{item.location}</td>
                  <td>{item.description || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
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

export const getInventoryCount = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/stocks");
    return res.data.length;
  } catch (err) {
    console.error("Failed to fetch count:", err);
    return 0;
  }
};

export const getLowStockCount = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/stocks");
    return res.data.filter(item => item.quantity < 25).length;
  } catch (err) {
    console.error("Failed to fetch low stock count:", err);
    return 0;
  }
};


