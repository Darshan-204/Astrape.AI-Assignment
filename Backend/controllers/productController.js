// No Product model; return mock products from backend JSON file
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/mockProducts.json');
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
