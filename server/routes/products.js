const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  createProduct,
  searchProducts,
  getProduct,
  getNewProducts,
  getRelativeProducts,
  getProducts,
  updateProduct,
  deleteProduct, 
} = require('../controllers/products')

router.post('/products', authMiddleware, createProduct)

router.get('/products', getProducts)
router.get('/products/new', getNewProducts)
router.get('/search', searchProducts)
router.get('/products/relative/:product_id', getRelativeProducts)

router.post('/products/comment', updateProduct)

router.post('/products/rating', updateProduct)

router.get('/products/:product_id', getProduct)
router.put('/products/:product_id', authMiddleware, updateProduct)
router.delete('/products/:product_id', authMiddleware, deleteProduct)

module.exports = router