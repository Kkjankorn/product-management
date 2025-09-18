const categoryService = require('../services/categoryService');
const paginate = require('../utils/paginate');

exports.getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const { skip } = paginate({}, page, limit);
    const filter = { deleted: false };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    const docs = await categoryService.searchCategories(filter, skip, parseInt(limit));
    res.json({ data: docs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const cat = await categoryService.getCategoryById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });
    const c = await categoryService.createCategory({ name: name.trim() });
    res.status(201).json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const c = await categoryService.updateCategory(req.params.id, req.body);
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const soft = req.query.soft !== 'false';
    const d = await categoryService.deleteCategory(req.params.id, soft);
    res.json({ success: true, data: d });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
