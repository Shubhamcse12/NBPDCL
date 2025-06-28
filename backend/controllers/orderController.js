const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Stock = require("../models/StockItem");

const placeOrder = async (req, res) => {
  const { userEmail, items } = req.body;

  try {
    if (!userEmail || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Missing userEmail or items." });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found by email." });
    }

    const orderItems = [];

    for (const { itemId, quantity } of items) {
      const stockItem = await Stock.findById(itemId);

      if (!stockItem) {
        return res.status(404).json({ message: `Item not found: ${itemId}` });
      }

      if (stockItem.quantity < quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${stockItem.itemName}` });
      }

      // Update stock quantity
      stockItem.quantity -= quantity;
      await stockItem.save();

      orderItems.push({
        itemId: stockItem._id,
        quantity,
        unitPrice: stockItem.unitPrice,
      });
    }

    const newOrder = new Order({
      userId: user._id,
      items: orderItems,
      placedByEmail: user.email,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "✅ Order placed successfully", orderId: newOrder._id });
  } catch (err) {
    console.error("❌ Error in placing order:", err);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: "User email not found" });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found by email" });
    }

    // Find orders by user._id
    const orders = await Order.find({ userId: user._id })
      .populate("items.itemId", "itemName")
      .sort({ placedAt: -1 });

    console.log(`📥 Orders for ${userEmail}:`, orders.length);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

const allocateOrder = async (req, res) => {
  const { orderId, allocations } = req.body;

  try {
    const order = await Order.findById(orderId).populate("items.itemId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const allocatedQty = allocations[item.itemId._id] ?? item.quantity;

      const stockItem = await Stock.findById(item.itemId._id);
      if (!stockItem) return res.status(404).json({ message: "Stock not found" });

      if (stockItem.quantity < allocatedQty)
        return res.status(400).json({ message: `Insufficient stock for ${stockItem.itemName}` });

      stockItem.quantity -= allocatedQty;
      await stockItem.save();

      item.quantity = allocatedQty; // Update quantity to allocated value
    }

    order.status = "Allocated";
    await order.save();

    res.status(200).json({ message: "Order allocated successfully", order });
  } catch (err) {
    console.error("❌ Allocation error:", err);
    res.status(500).json({ message: "Server error allocating order" });
  }
};

const rejectOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Rejected";
    await order.save();

    res.status(200).json({ message: "Order rejected successfully", order });
  } catch (err) {
    console.error("❌ Rejection error:", err);
    res.status(500).json({ message: "Server error rejecting order" });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $in: [null, "Pending"] } })
      .populate("userId", "name email centerName designation")
      .populate("items.itemId", "itemName")
      .sort({ placedAt: -1 });

    console.log("📦 Pending Orders Count:", orders.length); // ✅ Log this
    console.log("🧾 Orders:", orders.map(o => ({
      id: o._id,
      status: o.status,
      placedBy: o.placedByEmail
    })));

    const formatted = orders.map((order) => ({
      ...order._doc,
      userName: order.userId?.name || "Unknown",
      centerName: order.userId?.centerName || "N/A",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching pending orders:", err);
    res.status(500).json({ message: "Server error fetching pending orders" });
  }
};




module.exports = { placeOrder , getMyOrders, allocateOrder, rejectOrder, getPendingOrders};
