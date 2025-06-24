// src/components/pages/CategoryStockPage.js
import React, { useEffect, useState } from "react";
import "./CategoryStockPage.css";

const CategoryStockPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call to your backend
    const fetchData = async () => {
      const dummyData = [
        { category: "Electronics", total: 340 },
        { category: "Stationery", total: 120 },
        { category: "Furniture", total: 45 },
        { category: "IT Equipment", total: 90 },
      ];
      setCategories(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div className="category-page">
      <h2 className="category-title">📦 Stock by Category</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Total Stock</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, i) => (
            <tr key={i}>
              <td>{item.category}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryStockPage;
