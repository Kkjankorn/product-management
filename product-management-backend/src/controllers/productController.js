const productService = require('../services/productService');
const paginate = require('../utils/paginate');

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const { skip } = paginate({}, page, limit);
    const filter = { deleted: false };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    const docs = await productService.searchProducts(filter, skip, parseInt(limit));
    res.json({ data: docs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await productService.getProductById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });
    if (!categoryId) return res.status(400).json({ message: 'categoryId is required' });
    const p = await productService.createProduct({ name: name.trim(), price: parseFloat(price)||0, categoryId });
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const p = await productService.updateProduct(req.params.id, req.body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const soft = req.query.soft !== 'false';
    const d = await productService.deleteProduct(req.params.id, soft);
    res.json({ success: true, data: d });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
