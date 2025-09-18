const Product = require('../models/Product');

const createProduct = async (data) => {
  const p = new Product(data);
  return p.save();
};

const updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

const getProductById = async (id) => {
  return Product.findById(id).populate('categoryId');
};

const deleteProduct = async (id, soft=true) => {
  if (soft) return Product.findByIdAndUpdate(id, { deleted: true }, { new: true });
  return Product.findByIdAndDelete(id);
};

const searchProducts = async (filter, skip, limit) => {
  return Product.find(filter).populate('categoryId').skip(skip).limit(limit).sort({ createdAt: -1 });
};

module.exports = { createProduct, updateProduct, getProductById, deleteProduct, searchProducts };
