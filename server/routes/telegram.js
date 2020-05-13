const router = require('express').Router()
const {
  newOrder,
  checkAvailability,
}  = require('../controllers/telegram')

router.post('/notify', newOrder)
router.post('/availability', checkAvailability)

module.exports = router