// src/components/pages/AddStockPage.js
import React, { useState } from "react";
import "./AddStockPage.css";

const AddStockPage = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unitPrice: "",
    supplier: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO: Replace this with a real API call
    console.log("Stock item submitted:", formData);
    alert("Stock item added successfully!");

    setFormData({
      itemName: "",
      category: "",
      quantity: "",
      unitPrice: "",
      supplier: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="add-stock-container">
      <h2 className="add-stock-title">➕ Add New Stock Item</h2>
      <form className="add-stock-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
            />
            {errors.itemName && <span className="error">{errors.itemName}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Unit Price (₹)</label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              min="0"
            />
            {errors.unitPrice && <span className="error">{errors.unitPrice}</span>}
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
            />
            {errors.supplier && <span className="error">{errors.supplier}</span>}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Add Stock</button>
        </div>
      </form>
    </div>
  );
};

export default AddStockPage;
