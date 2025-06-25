import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockByCategory.css";

const StockByCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/stocks/by-category")
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json)) {
          setData(json);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load stock category data.");
        setLoading(false);
      });
  }, []);

  const maxValue = Math.max(...data.map((item) => item.total), 1); // avoid division by 0

  return (
    <div className="category-page">
      <div className="header">
        <h1>📊 Stock by Category</h1>
        <button onClick={() => navigate("/")}>← Back to Dashboard</button>
      </div>

      {loading ? (
        <p className="info">Loading stock data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : data.length === 0 ? (
        <p className="info">No stock data found.</p>
      ) : (
        <div className="chart-container">
          {data.map((item) => (
            <div key={item.category} className="bar-group">
              <span className="bar-label">{item.category}</span>
              <div
                className="bar"
                style={{
                  width: `${(item.total / maxValue) * 100}%`,
                  minWidth: "40px",
                }}
              >
                {item.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockByCategory;
