import React, { useState, useEffect } from "react";
import "./AddStockPage.css";
import axios from "axios";

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
  const [successMsg, setSuccessMsg] = useState("");
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/stocks/add", formData);
      setSuccessMsg("✅ Stock item added successfully!");
      setFormData({
        itemName: "",
        category: "",
        quantity: "",
        unitPrice: "",
        supplier: "",
        location: "",
        description: "",
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to add stock item.");
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

  return (
    <div className="add-stock-wrapper">
      <div className="add-stock-container">
        <h2 className="add-stock-title">➕ Add New Stock Item</h2>
        {successMsg && <div className="success-msg">{successMsg}</div>}

        <form className="add-stock-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {[
              { label: "Item Name", name: "itemName" },
              { label: "Category", name: "category" },
              { label: "Quantity", name: "quantity", type: "number" },
              { label: "Unit Price (₹)", name: "unitPrice", type: "number" },
              { label: "Supplier", name: "supplier" },
              { label: "Location", name: "location" },
            ].map(({ label, name, type = "text" }) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  min={type === "number" ? 0 : undefined}
                />
                {errors[name] && (
                  <span className="error">{errors[name]}</span>
                )}
              </div>
            ))}

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Stock
            </button>
          </div>
        </form>
      </div>

      {/* Filter Section */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Table */}
      <div className="product-list-full">
        <h3>📦 Existing Stock Items</h3>
        {filteredProducts.length === 0 ? (
          <p>No matching stock items found.</p>
        ) : (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice}</td>
                  <td>{item.supplier}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddStockPage;
