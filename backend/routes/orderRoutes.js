const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getPendingOrders,
  allocateOrder,
  rejectOrder
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Order placing and fetching
router.post("/", placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Pending orders for admin/staff
router.get("/pending", protect, getPendingOrders);

// Allocation / Rejection routes
router.post("/allocate", protect, allocateOrder);
router.post("/reject", protect, rejectOrder);

module.exports = router;
