const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orders')

router.get('/orders', authMiddleware, getOrders)
router.post('/orders', createOrder)

router.get('/orders/:order_id', getOrder)
router.put('/orders/:order_id', authMiddleware, updateOrder)
router.delete('/orders/:order_id', authMiddleware, deleteOrder)

module.exports = router