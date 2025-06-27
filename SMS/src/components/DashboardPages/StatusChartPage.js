import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./StatusChartPage.css";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Available, Low, Out

const StatusChartPage = () => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stocks");
        const stocks = res.data;

        let available = 0;
        let low = 0;
        let out = 0;

        stocks.forEach((item) => {
          if (item.quantity === 0) out++;
          else if (item.quantity <= 10) low++;
          else available++;
        });

        const formatted = [
          { name: "Available", value: available },
          { name: "Low Stock", value: low },
          { name: "Out of Stock", value: out },
        ];

        setStatusData(formatted);
      } catch (err) {
        console.error("Error fetching stock data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockStatus();
  }, []);

  return (
    <div className="status-page-container">
      <h2 className="status-page-title">🥧 Stock Status Breakdown</h2>
      {loading ? (
        <div className="status-loading">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              label
              outerRadius={120}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StatusChartPage;
