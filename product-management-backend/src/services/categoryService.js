const Category = require('../models/Category');

const createCategory = async (data) => {
  const c = new Category(data);
  return c.save();
};

const updateCategory = async (id, data) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const deleteCategory = async (id, soft=true) => {
  if (soft) return Category.findByIdAndUpdate(id, { deleted: true }, { new: true });
  return Category.findByIdAndDelete(id);
};

const searchCategories = async (filter, skip, limit) => {
  return Category.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

module.exports = { createCategory, updateCategory, getCategoryById, deleteCategory, searchCategories };
