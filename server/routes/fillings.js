const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  getFillings,
  createFilling,
  updateFilling,
  deleteFilling
} = require('../controllers/fillings')

router.get('/fillings', getFillings)
router.post('/fillings', authMiddleware, createFilling) 
router.put('/fillings/:filling_id', authMiddleware, updateFilling)
router.delete('/fillings/:filling_id', authMiddleware, deleteFilling)

module.exports = router