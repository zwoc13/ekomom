const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articles')

router.post('/articles', authMiddleware, createArticle)
router.get('/articles', getArticles)

router.get('/articles/:article_id', getArticle)
router.put('/articles/:article_id', authMiddleware, updateArticle)
router.delete('/articles/:article_id', authMiddleware, deleteArticle)

module.exports = router