import axios from 'axios';
const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const getProducts = (page=1, limit=10, search='') =>
  axios.get(`${API}/products`, { params: { page, limit, search } }).then(r=>r.data);

export const getProduct = (id) => axios.get(`${API}/product/${id}`).then(r=>r.data);
export const createProduct = (p) => axios.post(`${API}/product`, p).then(r=>r.data);
export const updateProduct = (id,p) => axios.put(`${API}/product/${id}`, p).then(r=>r.data);
export const deleteProduct = (id) => axios.delete(`${API}/product/${id}`).then(r=>r.data);
