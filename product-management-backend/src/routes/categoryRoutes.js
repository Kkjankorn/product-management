const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoryController');

router.get('/categories', ctrl.getCategories);
router.get('/category/:id', ctrl.getCategoryById);
router.post('/category', ctrl.createCategory);
router.put('/category/:id', ctrl.updateCategory);
router.delete('/category/:id', ctrl.deleteCategory);

module.exports = router;
