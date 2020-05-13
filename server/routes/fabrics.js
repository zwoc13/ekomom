const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  getFabrics,
  createFabrics,
  updateFabrics,
  deleteFabrics,
} = require('../controllers/fabrics')

router.get('/fabrics', getFabrics)
router.post('/fabrics', authMiddleware, createFabrics)
router.put('/fabrics/:fabrics_id', authMiddleware, updateFabrics)
router.delete('/fabrics/:fabrics_id', authMiddleware, deleteFabrics)

module.exports = router