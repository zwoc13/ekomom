const router = require('express').Router()
const { collectRoutes } = require('../controllers/seo')

router.get('/seo', collectRoutes)

module.exports = router