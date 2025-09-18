import axios from 'axios';
const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const getCategories = (page = 1, limit = 10, search = '') =>
  axios.get(`${API}/categories`, { params: { page, limit, search } }).then(r => r.data);

export const getCategory = (id) => axios.get(`${API}/category/${id}`).then(r => r.data);
export const createCategory = (c) => axios.post(`${API}/category`, c).then(r => r.data);
export const updateCategory = (id, c) => axios.put(`${API}/category/${id}`, c).then(r => r.data);
export const deleteCategory = (id) => axios.delete(`${API}/category/${id}`).then(r => r.data);
