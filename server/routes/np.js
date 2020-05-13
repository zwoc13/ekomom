const router = require('express').Router()
const {
  searchCities,
  searchWarehouse,
} = require('../controllers/np')

router.post('/cities/search', searchCities)
router.post('/warehouses/search', searchWarehouse)

module.exports = router