// Search products from mockProducts.json
const fs = require('fs');
const path = require('path');

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const filePath = path.join(__dirname, '../data/mockProducts.json');
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(q.toLowerCase()))
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
