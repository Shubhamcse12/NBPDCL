import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllocateOrder.css";

const AllocateOrder = () => {
  const [orders, setOrders] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allocations, setAllocations] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchStocks();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log("🔄 Fetching pending orders...");
      const res = await axios.get("http://localhost:5000/api/orders/pending", {
        withCredentials: true,
      });
      console.log("📦 Orders fetched:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err.message);
    }
  };

  const fetchStocks = async () => {
    try {
      console.log("🔄 Fetching current stock data...");
      const res = await axios.get("http://localhost:5000/api/stocks", {
        withCredentials: true,
      });
      console.log("📦 Stocks fetched:", res.data);
      setStocks(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch stocks:", err.message);
    }
  };

  const handleQuantityChange = (orderId, itemId, value) => {
    console.log(`✏️ Quantity changed: Order ${orderId}, Item ${itemId}, Qty: ${value}`);
    setAllocations((prev) => ({
      ...prev,
      [orderId]: {
        ...(prev[orderId] || {}),
        [itemId]: Math.max(0, Number(value)),
      },
    }));
  };

  const updateOrderStatus = (orderId, status) => {
    console.log(`🔁 Updating order ${orderId} to status: ${status}`);
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  };

  const handleAllocate = async (orderId, items) => {
    const alloc = allocations[orderId] || {};
    console.log(`📤 Allocating order ${orderId} with:`, alloc);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/allocate",
        {
          orderId,
          allocations: alloc,
        },
        { withCredentials: true }
      );

      console.log("✅ Allocation successful:", response.data);
      updateOrderStatus(orderId, "Allocated");
      alert("✅ Order allocated!");
    } catch (err) {
      console.error("❌ Allocation failed:", err.response?.data || err.message);
      alert("❌ Allocation failed");
    }
  };

  const handleReject = async (orderId) => {
    console.log(`🛑 Rejecting order ${orderId}`);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/reject",
        { orderId },
        { withCredentials: true }
      );

      console.log("❌ Rejection successful:", response.data);
      updateOrderStatus(orderId, "Rejected");
      alert("❌ Order rejected.");
    } catch (err) {
      console.error("❌ Rejection failed:", err.response?.data || err.message);
      alert("❌ Rejection failed");
    }
  };

  return (
    <div className="allocate-order-container">
      <h2>📋 Pending Orders</h2>
      {orders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h4>🧑‍💼 {order.userName || "User"} ({order.userId})</h4>
            <p><strong>Email:</strong> {order.placedByEmail}</p>
            <p><strong>Date:</strong> {new Date(order.placedAt).toLocaleDateString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${
                order.status === "Allocated"
                  ? "status-allocated"
                  : order.status === "Rejected"
                  ? "status-rejected"
                  : "status-pending"
              }`}>
                {order.status}
              </span>
            </p>

            {order.items.map((item, idx) => {
              const stockItem = stocks.find((s) => s._id === item.itemId._id);
              const inStock = stockItem?.quantity ?? 0;

              return (
                <div key={idx} className="order-item">
                  <span><strong>{item.itemId.itemName}</strong></span>
                  <span>Requested: {item.quantity}</span>
                  <span>In Stock: {inStock}</span>
                  <input
                    type="number"
                    min="0"
                    max={item.quantity}
                    disabled={order.status !== "Pending"}
                    value={
                      allocations[order._id]?.[item.itemId._id] ?? item.quantity
                    }
                    onChange={(e) =>
                      handleQuantityChange(order._id, item.itemId._id, e.target.value)
                    }
                  />
                </div>
              );
            })}

            {order.status === "Pending" && (
              <div className="button-group">
                <button
                  onClick={() => handleAllocate(order._id, order.items)}
                  className="allocate-btn"
                >
                  ✅ Allocate
                </button>
                <button
                  onClick={() => handleReject(order._id)}
                  className="reject-btn"
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllocateOrder;
