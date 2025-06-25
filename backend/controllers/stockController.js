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

const getStockByCategory = async (req, res) => {
  try {
    const stockData = await StockItem.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      }
    ]);

    res.status(200).json(stockData);
  } catch (err) {
    console.error("Error in getStockByCategory:", err);
    res.status(500).json({ error: "Failed to fetch stock by category" });
  }
};


module.exports = {
  addStock,
  getAllStocks,
  getStockByCategory,
};
