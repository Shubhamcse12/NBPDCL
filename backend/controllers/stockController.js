// controllers/stockController.js
const Stock = require("../models/StockItem");

const addStock = async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json({ message: "Stock item added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add stock item" });
  }
};

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock items" });
  }
};

module.exports = {
  addStock,
  getAllStocks,
};
