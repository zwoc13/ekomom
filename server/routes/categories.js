const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories')

router.get('/categories', getCategories)
router.post('/categories', authMiddleware, createCategory)
router.put('/categories/:category_id', authMiddleware, updateCategory)
router.delete('/categories/:category_id', authMiddleware, deleteCategory)

router.get('/category/:category_id', getCategory)

module.exports = router